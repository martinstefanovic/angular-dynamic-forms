import { CheckboxComponent } from './../../components/form-fields/checkbox/checkbox.component';
import { FormFactoryModel } from '../models/form-factory';
import { InputComponent } from '../../components/form-fields/input/input.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Inject, Injectable } from '@angular/core';
import { TextareaComponent } from '../../components/form-fields/textarea/textarea.component';
import { FieldTypeModel } from '../models/field-type';
import { DropdownComponent } from '../../components/form-fields/dropdown/dropdown.component';

@Injectable({
  providedIn: 'root',
})
export class FormFactoryService {
  /**
   * List of default supported form fields
   */
  private formFields: FieldTypeModel[] = [
    {
      type: 'input',
      component: InputComponent,
    },
    {
      type: 'textarea',
      component: TextareaComponent,
    },
    {
      type: 'dropdown',
      component: DropdownComponent,
    },
    {
      type: 'checkbox',
      component: CheckboxComponent,
    },
  ];

  constructor(
    @Inject('config') private config: { fields: FieldTypeModel[] },
    private fb: FormBuilder
  ) {
    /**
     * Add fields passed through the forRoot({}) configuration
     */
    this.formFields = this.formFields.concat(config.fields);
  }

  public get fields(): FieldTypeModel[] {
    return this.formFields;
  }

  /**
   *
   * @param fields JSON object with form fields
   * @returns FormGroup
   */
  createForm(fields: FormFactoryModel[]): FormGroup {
    const form: FormGroup = this.fb.group({});
    let validators: any[];

    const createField = (singleField: any) => {
      validators = [];
      let newControl;
      if (singleField.options) {
        if (singleField.options.formControlType === 'array') {
          // Create from array
          newControl = new FormArray([]);
        } else {
          // Create form control
          newControl = new FormControl({
            value: singleField.options?.value ?? '',
            disabled: singleField.options?.disabled && true,
          });
        }

        // Add validators to control
        if (singleField.options?.validators?.pattern) {
          validators.push(
            Validators.pattern(singleField.options?.validators?.pattern)
          );
        }
        if (singleField.options?.validators?.required) {
          validators.push(Validators.required);
        }
        if (singleField.options?.validators?.maxLength) {
          validators.push(
            Validators.maxLength(singleField.options?.validators?.maxLength)
          );
        }

        // Set validators
        newControl.setValidators(validators);
        // Add control to form
        form.addControl(singleField.options.formControlName, newControl);
      }
    };

    fields.forEach((field: any) => {
      if (field.dummyFields) {
        field.dummyFields.forEach((dummyField: any) => {
          createField(dummyField);
        });
      }
      // Check if this is group of dields
      if (field.group) {
        // Loop group of fields
        field.group.forEach((singleField: any) => {
          createField(singleField);
        });
      } else {
        createField(field);
      }
    });

    return form;
  }

  getFormGroup(form: FormGroup, field: string): FormGroup {
    return form.get(field) as FormGroup;
  }
}
