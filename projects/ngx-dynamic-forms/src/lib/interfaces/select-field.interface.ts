import { GenericField } from './generic-field.interface';

export interface SelectField extends GenericField {
  selectOptions: any[];
  selectLabel: string;
  selectValue: string;
}
