import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { FormFactoryFieldComponent } from 'ngx-dynamic-forms';

@Component({
  selector: 'app-input-password',
  imports: [ReactiveFormsModule, CommonModule],
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
      <pre>
       <!-- If you want to handle errors you can do that with the control property control?.errors -->
        {{ control?.errors | json }}
      </pre>
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
  // ! IMPORTANT: You must provide the viewProviders like in this example
  // ! to make the formControlName directive work properly

  showPassword = signal(false);

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }

  updateValueManual(value: string) {
    // If you don't want to use the formControlName directive
    // you can update the value manually with this method
    this.updateValue(value);
  }
}
