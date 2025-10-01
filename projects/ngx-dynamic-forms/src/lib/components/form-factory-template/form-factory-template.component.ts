import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FieldRendererComponent } from '../fields/field-renderer/field-renderer.component';
import { injectFormFactoryConfig } from '../../config/config.token';

@Component({
  selector: 'lib-form-factory-template',
  imports: [CommonModule, FieldRendererComponent],
  template: `
    <section class="{{ field().group ? _config.grid.nestedGridClassess : '' }}">
      @if(field().group){ @for(groupField of field().group; track field().group){
      <lib-form-factory-template [field]="groupField" />
      } }@else {
      <lib-field-renderer [field]="field()"></lib-field-renderer>
      }
    </section>
  `,
  host: { '[class]': '_getClass()' },
})
export class FormFactoryTemplateComponent {
  public readonly _config = injectFormFactoryConfig();

  field: any = input();

  private _getClass() {
    return this.field().colSize;
  }
}
