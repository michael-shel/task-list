import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { task } from '../../store/tasks.selector';
import { TasksState } from '../../store/tasks.reducers';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Types } from '../../models/types';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  task$ = this.store.pipe(select(task));
  task: Task;

  constructor(private store: Store<TasksState>) { }

  public dynamicFormGroup: FormGroup;
  public taskForm: FormGroup;
  public fields = [];

  types = new Types().types;

  async ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(null),
    });

    this.taskForm.get("type").valueChanges
      .subscribe(f => {
        this.onTypeChanged(f);
      });

    this.task$.subscribe(task => {
      if (task) {
        this.taskForm.get("name").setValue(task.name || '', { emitEvent: false });
        this.taskForm.get("type").setValue(this.types.find(x => x.id === task.type), { emitEvent: true });
      }
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

  onSubmit() {
    console.log(this.taskForm.value);
    console.log(this.dynamicFormGroup.value);
  }
}
