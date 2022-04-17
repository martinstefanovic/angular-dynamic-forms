import { FormFactoryModel } from '../form-factory/core/models/form-factory';

export const fieldsFromApi: FormFactoryModel[] = [
  {
    colSize: 'col-12 sm:col-3',
    group: [
      {
        controlType: 'input',
        options: {
          type: 'text',
          containerClass: 'mb-0',
          label: 'Title',
          placeholder: 'Hello',
          formControlName: 'title',
          value: '',
          disabled: false,
          validators: {
            required: true,
            maxLength: 200,
          },
        },
      },
      {
        controlType: 'input',
        options: {
          type: 'text',
          containerClass: 'mb-0',
          label: 'Subtitle',
          placeholder: '',
          formControlName: 'subtitle',
          value: '',
          disabled: false,
          validators: {
            required: true,
            maxLength: 200,
          },
        },
      },
    ],
  },
  {
    controlType: 'textarea',
    colSize: 'col-12 sm:col-3',
    options: {
      type: 'text',
      label: 'Description',
      formControlName: 'description',
      value: '',
      rows: 5,
      validators: {
        required: true,
        maxLength: 200,
      },
    },
  },
  {
    dummyFields: [
      {
        options: {
          formControlName: 'dummyField',
          value: 'Hello!',
        },
      },
    ],
  },
];
