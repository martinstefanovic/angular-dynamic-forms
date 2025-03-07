import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-field-errors',
  imports: [CommonModule],
  template: `
    @if(errors()?.email){
    <div class="ui-text-red-500 ui-text-xs ui-mt-1">Field must be valid email.</div>
    } @if(errors()?.minlength){
    <div class="ui-text-red-500 ui-text-xs ui-mt-1">
      Field must be minimum {{ errors()?.minlength?.requiredLength }} length. Actual length is
      {{ errors()?.minlength?.actualLength }}.
    </div>
    } @if(errors()?.required){
    <div class="ui-text-red-500 ui-text-xs ui-mt-1">Field is required</div>
    } @if(errors()?.maxlength){
    <div class="ui-text-red-500 ui-text-xs ui-mt-1">
      Field must be maximum {{ errors()?.maxlength?.requiredLength }} length. Actual length is
      {{ errors()?.maxlength?.actualLength }}.
    </div>
    } @if(errors()?.pattern){
    <div class="ui-text-red-500 ui-text-xs ui-mt-1">
      Field must match pattern {{ errors()?.pattern?.requiredPattern }}.
    </div>
    }
  `,
})
export class FieldErrorsComponent {
  errors = input<any>(null);
}
