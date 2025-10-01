import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFactoryService } from '../../services/form-factory.service';
import { FormFactoryTemplateComponent } from '../form-factory-template/form-factory-template.component';
import { injectFormFactoryConfig } from '../../config/config.token';

@Component({
  selector: 'ngx-form-factory',
  imports: [CommonModule, ReactiveFormsModule, FormFactoryTemplateComponent],
  template: `
    <section [class]="_config.grid.mainGridClassess" [formGroup]="form()">
      @for(formField of formFields(); track formField){
      <lib-form-factory-template [field]="formField"></lib-form-factory-template>
      }
    </section>
  `,
  host: { class: 'ngx-dynamic-forms' },
})
export class FormFactoryComponent {
  public readonly _config = injectFormFactoryConfig();
  fb = inject(FormBuilder);
  formFactory = inject(FormFactoryService);
  form = input.required<FormGroup>();
  formFields = input.required<any[]>();
}
