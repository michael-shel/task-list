import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  public dynamicFormGroup: FormGroup;
  public taskForm: FormGroup;
  public fields = [];

  model = [
    {
      id: 'wash-dishes',
      fields: {
        who: {
          type: "text",
          value: "",
          label: "Who",
          rules: {
            required: true,
          }
        },
        room: {
          type: "text",
          value: "",
          label: "Room",
          rules: {
            required: true,
          }
        }
      }
    },
    {
      id: 'vacuum-clean',
      fields: {
        durationInHours: {
          type: "text",
          value: "",
          label: "Duration In Hours",
          rules: {
            required: true,
          }
        },
      }
    }
  ];

  types = this.model;

  ngOnInit() {
    this.taskForm = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(null),
    });

    this.taskForm.get("type").valueChanges
      .subscribe(f=> {
        this.onTypeChanged(f);
    });
  }

  private buildForm(type) {
    const formGroupFields = this.getFormControlsFields(type);
    this.dynamicFormGroup = new FormGroup(formGroupFields);
  }

  private getFormControlsFields(type: any) {
    const formGroupFields = {};
    this.fields = [];
    for (const field of Object.keys(type)) {

      const fieldProps = type[field];
      const validators = this.addValidator(fieldProps.rules);

      formGroupFields[field] = new FormControl(fieldProps.value, validators);
      this.fields.push({...fieldProps, fieldName: field});
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
 
  onTypeChanged(value) {
    console.log('onTypeChanged', value);
    this.buildForm(value.fields);
    console.log('this.dynamicFormGroup', this.dynamicFormGroup);
  };

  onSubmit() {
    console.log(this.taskForm.value);
    console.log(this.dynamicFormGroup.value);
  }
}
