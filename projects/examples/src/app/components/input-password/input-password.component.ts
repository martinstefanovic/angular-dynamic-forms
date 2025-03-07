import { Component, signal } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FormFactoryFieldComponent } from 'ngx-dynamic-forms';

@Component({
  selector: 'app-input-password',
  imports: [ReactiveFormsModule],
  styleUrl: './input-password.component.scss',
  template: `
    @if(field()){
    <div class="password-field">
      <label>{{ field().label }}</label>
      <div class="input-container">
        <input
          [type]="showPassword() ? 'text' : 'password'"
          class="password-input"
          [formControlName]="field().options.formControlName"
        />
        <button type="button" class="toggle-btn" (click)="togglePasswordVisibility()">
          @if(showPassword()){
          <span>👁️</span>

          }@else {

          <span>🙈</span>
          }
        </button>
      </div>
    </div>
    }
  `,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InputPasswordComponent extends FormFactoryFieldComponent {
  showPassword = signal(false);

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }

  updateValueManual(value: string) {
    this.updateValue(value);
  }
}
