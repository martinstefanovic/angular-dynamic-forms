import { Validators } from '@angular/forms';

import { TitleComponent } from './components/title/title.component';
import {
  createField,
  DynamicInputComponent,
  DynamicSelectComponent,
  FieldGroup,
  InputField,
  SelectField,
  UIElement,
} from 'ngx-dynamic-forms';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputPasswordField } from './components/input-password/input-password-field.interface';

export default [
  createField<InputField>({
    colSize: 'ui-col-span-12 sm:ui-col-span-4',
    controlType: 'input',
    label: 'Name',
    placeholder: 'Enter name',
    type: 'text',
    options: {
      formControlName: 'name',
      value: 'Test',
      disabled: false,
      validators: [Validators.minLength(3), Validators.required, Validators.maxLength(10)],
    },
  }),
  createField<FieldGroup>({
    colSize: 'ui-col-span-12 sm:ui-col-span-4',
    group: [
      createField<InputField>({
        colSize: 'ui-col-span-12',
        controlType: DynamicInputComponent,
        label: 'Email',
        placeholder: 'example@email.com',
        options: {
          formControlName: 'email',
          disabled: false,
          validators: [Validators.minLength(3), Validators.email],
        },
      }),
      createField<InputPasswordField>({
        colSize: 'ui-col-span-12 ',
        controlType: InputPasswordComponent,
        label: 'Custom password field',
        options: {
          formControlName: 'password',
          value: 'Test',
          disabled: false,
          validators: [Validators.minLength(3), Validators.required, Validators.maxLength(10)],
        },
      }),
    ],
  }),
  createField<FieldGroup>({
    colSize: 'ui-col-span-12 sm:ui-col-span-4',
    group: [
      createField<UIElement>({
        colSize: 'ui-col-span-12',
        controlType: TitleComponent,
        data: {
          title: 'About you',
        },
      }),
      createField<SelectField>({
        colSize: 'ui-col-span-12  sm:ui-col-span-6 ',
        controlType: DynamicSelectComponent,
        label: 'Favorite color',
        selectOptions: [],
        selectValue: 'id',
        selectLabel: 'name',
        options: {
          formControlName: 'favoriteColor',
          value: 1,
          disabled: false,
          validators: [Validators.required],
        },
      }),
      createField<InputField>({
        colSize: 'ui-col-span-12 sm:ui-col-span-6',
        controlType: DynamicInputComponent,
        label: 'Phone',
        options: {
          formControlName: 'nickname',
          value: '',
          validators: [Validators.minLength(3), Validators.pattern(/[0-9]/), Validators.required],
        },
      }),
    ],
  }),
];
