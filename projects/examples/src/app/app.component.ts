import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFactoryComponent, FormFactoryService } from 'ngx-dynamic-forms';
import jsonFormExample from './json-form-example';
import { MyApiService } from './my-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormFactoryComponent, CommonModule],
  template: `
    <section class="p-10">
      <button class="mb-4" (click)="patchForm()">Populate form</button>
      <ngx-form-factory [form]="form" [formFields]="formFields()" />
    </section>

    <pre class="bg-gray-200 p-4"
      >{{ form.getRawValue() | json }}
</pre>
  `,
})
export class AppComponent {
  form!: FormGroup;
  formFields = signal<any[]>([]);
  formFactory = inject(FormFactoryService);
  myApiService = inject(MyApiService);

  ngOnInit(): void {
    this.form = this.formFactory.createForm(jsonFormExample);
    this.formFields.set(jsonFormExample);

    this.loadSelectOptionsFromApi();
  }

  loadSelectOptionsFromApi() {
    this.myApiService.loadSelectOptionsFromAPI().then(() => {
      this.formFactory.addSelectOptionsToField({
        fields: this.formFields,
        formControlName: 'favoriteColor',
        options: [
          { id: 1, name: 'Red' },
          { id: 2, name: 'Green' },
          { id: 3, name: 'Blue' },
        ],
      });
    });
  }

  patchForm() {
    this.formFactory.patchForm(this.form, {
      name: 'John Doe',
      email: 'example@mail.com',
      phone: '06112332145',
      favoriteColor: 2,
    });
  }
}
