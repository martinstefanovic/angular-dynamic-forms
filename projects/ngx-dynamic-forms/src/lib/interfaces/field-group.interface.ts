import { GenericField } from './generic-field.interface';

export interface FieldGroup {
  colSize: string;
  group: Partial<GenericField>[];
}
