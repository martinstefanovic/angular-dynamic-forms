import { Component, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFactoryComponent, FormFactoryService } from 'ngx-dynamic-forms';
import jsonFormExample from './json-form-example';
import { MyApiService } from './my-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormFactoryComponent, CommonModule],
  styles: `
  main{
    padding: 2rem;
  }
  .button{
    padding: .8rem 1.3rem;
    border: none;
    background-color: #18181b;
    color: white;
    cursor: pointer;
    border-radius: 6px;
    margin-bottom: 1rem;
  }
  pre{
    border-radius: 6px;
    padding:1rem;
    background-color: oklch(0.967 0.003 264.542);
    margin: 1rem 2rem 2rem 2rem;
  }
  `,
  template: `
    <main>
      <button class="button" (click)="patchForm()">Patch form</button>
      <ngx-form-factory [form]="form" [formFields]="formFields()" />
    </main>

    <pre
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
