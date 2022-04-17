export class FormFactoryModel {
  group?: any[];
  controlType?: 'input' | 'rich-editor' | 'dropdown' | 'textarea';
  colSize?: string; // Grid from primeng example: col-12
  dummyFields?: {
    options: {
      formControlName: string;
      formControlType?: 'array'; // Default is 'control'
      value?: any;
    };
  }[];
  options?: {
    // ? Universal options
    label?: string; // Label above field
    containerClass?: string; // This class is for input field container
    placeholder?: string; // Field placeholder
    formControlName?: string; // Form control name
    value?: any; // Default value for field
    disabled?: boolean; // Define is form field disabled
    validators?: {
      // Validators for form field
      required?: boolean;
      maxLength?: number;
    };
    errorMessage?: string;
    class?: string;
    // ? Input
    type?: 'text';
    // ? Dropdown
    dropdownOptions?: any;
    optionValue?: string;
    optionLabel?: string;

    id?: number;
    rows?: number | string;
    fieldFormGroup?: string;
  };
}
