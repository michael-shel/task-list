import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { isLoadingSelector, task, tasks } from '../../store/tasks.selector';
import { TasksState } from '../../store/tasks.reducers';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Types } from '../../models/types';
import { Task } from '../../models/task.interface';
import { addTask, updateTask } from '../../store/tasks.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  task$ = this.store.pipe(select(task));
  task: Task;
  loading$ = this.store.pipe(select(isLoadingSelector));
  loading: boolean;
  labelCTA: string = 'Add Task';

  constructor(private store: Store<TasksState>, private route: ActivatedRoute) { }

  public dynamicFormGroup: FormGroup;
  public taskForm: FormGroup;
  public fields = [];

  types = new Types().types;

  async ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      type: new FormControl(null, [
        Validators.required,
        Validators.nullValidator
      ]),
    });

    this.taskForm.get("type").valueChanges
      .subscribe(f => {
        this.onTypeChanged(f);
      });

    this.task$.subscribe(task => {
      if (task) {
        this.task = task;
        this.labelCTA = 'Update Task';
        this.taskForm.get("name").setValue(this.task.name || '', { emitEvent: false });
        this.taskForm.get("type").setValue(this.types.find(x => x.id === this.task.type), { emitEvent: true });
      }
    });

    this.loading$.subscribe(isLoading => {
      this.loading = isLoading
    });
  }

  onTypeChanged(value) {
    this.buildForm(value);
  };

  private buildForm(type) {
    const formGroupFields = this.getFormControlsFields(type.fields);
    this.dynamicFormGroup = new FormGroup(formGroupFields);

    this.task$.subscribe(task => {
      if (task) {
        for (const [key, value] of Object.entries(task.fields)) {
          this.dynamicFormGroup.get(key)?.setValue(value, { emitEvent: false })
        }
      }
    });
  }

  private getFormControlsFields(type: any) {
    const formGroupFields = {};
    this.fields = [];
    for (const field of Object.keys(type)) {

      const fieldProps = type[field];
      const validators = this.addValidator(fieldProps.rules);

      formGroupFields[field] = new FormControl(fieldProps.value, validators);
      this.fields.push({ ...fieldProps, fieldName: field });
    }

    return formGroupFields;
  }

  private addValidator(rules) {
    if (!rules) {
      return [];
    }

    const validators = Object.keys(rules).map((rule) => {
      switch (rule) {
        case "required":
          return Validators.required;
        //add more case for future.
      }
    });
    return validators;
  }

  get name() { return this.taskForm.get('name'); }

  get type() { return this.taskForm.get('type'); }

  Validate() {
    if (this.taskForm.invalid || this.dynamicFormGroup?.invalid) {
      for (const control of Object.keys(this.taskForm.controls)) {
        this.taskForm.controls[control].markAsTouched();
      }

      if (this.dynamicFormGroup) {
        for (const control of Object.keys(this.dynamicFormGroup.controls)) {
          this.dynamicFormGroup.controls[control].markAsTouched();
        }
      }

      return false
    }

    return true
  }

  onSubmit() {
    if (this.Validate()) {
      for (const [key, value] of Object.entries(this.taskForm.get('type').value.fields)) {
        if (value['type'] === 'number') {
          this.dynamicFormGroup.value[key] = Number(this.dynamicFormGroup.value[key])
        } else if (value['type'] === 'date') {
          this.dynamicFormGroup.value[key] = new Date(this.dynamicFormGroup.value[key])
        }
      }
  
      let taskRequest: Task = {
        name: this.taskForm.get('name').value,
        type: this.taskForm.get('type').value.id,
        fields: this.dynamicFormGroup.value
      };
  
      if (this.task && this.route.snapshot.params['id'] === this.task._id) {
        taskRequest._id = this.task._id;

        this.store.dispatch(updateTask({task: taskRequest}));
      } else {
        this.store.dispatch(addTask({task: taskRequest}));
      }
    }
  }
}
