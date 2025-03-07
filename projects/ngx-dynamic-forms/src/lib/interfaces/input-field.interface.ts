import { GenericField } from './generic-field.interface';

export interface InputField extends GenericField {
  type:
    | 'number'
    | 'text'
    | 'email'
    | 'password'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'
    | 'url'
    | 'tel'
    | 'search'
    | 'color';
}
