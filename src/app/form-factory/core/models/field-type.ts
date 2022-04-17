import { DynamicField } from './dynamic-field';
import { Type } from '@angular/core';
export interface FieldTypeModel {
  type: string;
  component: Type<DynamicField>;
}
