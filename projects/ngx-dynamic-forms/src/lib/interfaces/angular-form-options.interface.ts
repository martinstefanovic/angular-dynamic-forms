import { Validators } from '@angular/forms';

export interface AngularFormOptions {
  formControlName: string;
  value?: string | number;
  disabled?: boolean;
  validators?: any[];
}
