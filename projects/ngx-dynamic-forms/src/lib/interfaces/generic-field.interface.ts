import { AngularFormOptions } from './angular-form-options.interface';

export interface GenericField {
  colSize: string;
  controlType: any;
  label?: string;
  placeholder?: string;
  options: AngularFormOptions;
}
