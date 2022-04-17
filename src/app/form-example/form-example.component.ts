import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from '../form-factory/core/services/form-builder.service';
import { FormFactoryModel } from '../form-factory/core/models/form-factory';
import { fieldsFromApi } from './fields-from-api';

@Component({
  selector: 'app-form-example',
  template: ` <section>
      <p-button
        styleClass="mb-3"
        label="Submit"
        (click)="onSubmit()"
      ></p-button>
      <p-button
        styleClass="mb-3 ml-2 p-button-secondary"
        label="Reset"
        (click)="onReset()"
      ></p-button>
    </section>
    <!-- EXAMPLE 1: -->
    <!-- <app-form-factory
      [form]="exampleForm"
      [fields]="exampleFields"
    ></app-form-factory> -->

    <!-- EXAMPLE 2: -->
    <app-form-factory
      [form]="formFactory.getFormGroup(exampleForm, 'dynamic')"
      [fields]="exampleFields"
    ></app-form-factory>
    <pre>{{ formOutput | json }}</pre>
    `,
})
export class FormExampleComponent implements OnInit {
  exampleForm!: FormGroup;
  formOutput: any;
  exampleFields: FormFactoryModel[] = fieldsFromApi;

  constructor(
    private fb: FormBuilder,
    public formFactory: FormBuilderService
  ) {}

  ngOnInit(): void {
    /**
     * EXAMPLE 1:
     *
     * Call formFactory service and pass form fields JSON configuration
     * to create new form group
     */
    // this.exampleForm = this.formFactory.createForm(this.exampleFields);
    /**
     * Example how to add additional formControl to form if you need
     */
    // this.exampleForm.addControl('id', new FormControl(1, Validators.required));

    /**
     * EXAMPLE 2:
     *
     * You can use this approach too to create forms if you also want to use
     * native angular form builder, but in this situation make sure to pass
     * 'dynamic' form group to app-form-factory component instead exampleForm
     */
    this.exampleForm = this.fb.group({
      dynamic: this.formFactory.createForm(this.exampleFields),
      id: ['1', Validators.required],
    });

    this.formOutput = this.exampleForm.getRawValue();
  }

  onSubmit() {
    this.formOutput = this.exampleForm.getRawValue();
  }
  onReset() {
    this.exampleForm.reset();
    this.formOutput = this.exampleForm.getRawValue();
  }
}
