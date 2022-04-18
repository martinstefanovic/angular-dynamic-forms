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
    colSize: 'col-12 sm:col-3',
    group: [
      {
        controlType: 'dropdown',
        options: {
          label: 'List',
          placeholder: 'Chose',
          formControlName: 'listOptions',
          optionValue: 'value',
          optionLabel: 'label',
          dropdownOptions: [
            {
              label: 'Item 1',
              value: 1,
            },
          ],
          value: [],
        },
      },
      {
        controlType: 'checkbox',
        options: {
          label: 'Remember me',
          formControlName: 'remember',
          value: true,
        },
      },
    ],
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
