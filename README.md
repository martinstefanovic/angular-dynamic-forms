## ✅ Key Features

- 🔹 **Dynamic Form Rendering** – Generate Angular forms dynamically from JSON configuration.
- 🔹 **Responsive Grid System** – Automatically arranges form fields in a flexible grid layout.
- 🔹 **Supports Angular Reactive Forms** – Easily integrates with `FormGroup` and `FormControl`.
- 🔹 **Server-Driven Forms Support** – Fetch form configurations from an API and dynamically render fields.
- 🔹 **Alias-Based Component Mapping** – Use string-based aliases for `controlType` instead of direct component references.
- 🔹 **Custom Component Support** – Extend the form factory with your own form field components.
- 🔹 **Built-in Example Components** – Includes two test field components for quick setup and reference.
- 🔹 **Validation Handling** – Supports Angular’s `Validators` for real-time form validation.
- 🔹 **Field Grouping** – Nest multiple fields inside a single column to create complex forms.
- 🔹 **Event Emitters** – Listen to form changes, value updates, and submission events.
- 🔹 **Multi-Step Forms Support** – Allows building wizard-style step-based forms.
- 🔹 **Lightweight & Optimized** – Designed for performance, minimal dependencies, and easy integration.

## 📦 Installation

To install **ngx-dynamic-forms-factory**, run the following command in your Angular project:

```sh
npm install ngx-dynamic-forms-factory
```

## 🚀 Usage

### 1️⃣ Add Styles to `angular.json`

Before using the library, include the required styles in your `angular.json` file under the `styles` array:

```json
"styles": [
   "node_modules/ngx-dynamic-forms-factory/src/preflight.css",
   "node_modules/ngx-dynamic-forms-factory/src/styles.css",
  ...
]
```

### 2️⃣ Basic Example of Usage

Import the necessary components and services in your Angular component:

```typescript
// your-angular-component.compontnt.ts

import { FormFactoryComponent, FormFactoryService } from 'ngx-dynamic-forms-factory';
import jsonFormExample from './json-form-example';

@Component({
  selector: 'app-root',
  imports: [FormFactoryComponent, CommonModule],
  template: `
    <main>
      <ngx-form-factory [form]="form" [formFields]="formFields()" />
    </main>

    <pre>
      {{ form.getRawValue() | json }}
    </pre
    >
  `,
})
export class AppComponent {
  form!: FormGroup;
  formFields = signal<any[]>([]);
  formFactory = inject(FormFactoryService);

  ngOnInit(): void {
    this.form = this.formFactory.createForm(jsonFormExample);
    this.formFields.set(jsonFormExample);
  }
}
```

## 🌐 Using Aliases for Server-Provided JSON Configuration

If you need to **provide form JSON configuration from a server API**, you can use **aliases** for `controlType` instead of directly referencing component classes.

### 🔹 Example:

Instead of:

```typescript
{
  "controlType": InputFieldComponent
}
```

You can use:

```json
{
  "controlType": "input"
}
```

This allows you to dynamically map string-based aliases to your components.

### 🛠 Registering Aliases in app.config.ts

To define aliases and their corresponding components, use provideFormFactoryConfig in your app configuration:

```typescript
import { provideFormFactoryConfig } from 'ngx-dynamic-forms';
import { MyCustomInputComponent } from './components/my-custom-input.component';

export const appConfig = {
  providers: [
    provideFormFactoryConfig({
      aliases: [{ component: MyCustomInputComponent, alias: 'input' }],
    }),
  ],
};
```

With this setup, any field with "controlType": "input" will automatically be rendered using MyCustomInputComponent.

This approach is useful when working with server-driven forms, allowing you to configure forms dynamically without modifying frontend code.

## 📄 Defining Form Fields in an External File

To keep the form configuration modular and reusable, define the form fields in an **external file**. The fields are created using the `createField` function and exported as an array.

### **Example: `json-form-example.ts`**

Create a file named `json-form-example.ts` and add the following:

````typescript
import { Validators } from '@angular/forms';
import { createField, InputField } from 'ngx-dynamic-forms-factory';

export default [
  createField<InputField>({
    colSize: 'ui-col-span-12 sm:ui-col-span-4',
    controlType: InputField,
    label: 'Name',
    placeholder: 'Enter name',
    type: 'text',
    options: {
      formControlName: 'name',
      value: 'Test',
      disabled: false,
      validators: [Validators.minLength(3), Validators.required, Validators.maxLength(10)],
    },
  }),
];
```

## 🛠 Built-in Example Fields & Custom Component Support

This library provides **two example field components** intended for **testing and demonstration purposes**.

If you want to **add your own custom components**, you can check out the example implementation here:
🔗 **[Custom Components Guide](https://github.com/martinstefanovic/angular-dynamic-forms/tree/master/projects/examples/src/app/components)**

This guide explains how to create and register **custom form components** to extend the functionality of `ngx-dynamic-forms-factory`.


## 📌 Field Types and Examples

The `createField` function is used to create form fields based on different interfaces. Below is a table of available field types and their descriptions.

| **Interface**     | **Description** |
|------------------|----------------|
| **`InputField`** | EXAMPLE FIELD! Standard text input field with validation and placeholder. |
| **`SelectField`** | EXAMPLE FIELD! Dropdown select field with predefined options. |
| **`UIElement`** | Used to insert a custom UI component into the form. |
| **`FieldGroup`** | Groups multiple fields together in a single column in the grid layout. |
| **`GenericField`** | Base interface for extending and creating custom fields. |

---

### **🔹 Example Usage of Each Field Type**

#### **📌 InputField**
```typescript
import { Validators } from '@angular/forms';
import { createField, InputField } from 'ngx-dynamic-forms-factory';

createField<InputField>({
  colSize: 'ui-col-span-12 sm:ui-col-span-4',
  controlType: InputField,
  label: 'Name',
  placeholder: 'Enter name',
  type: 'text',
  options: {
    formControlName: 'name',
    value: '',
    validators: [Validators.required, Validators.minLength(3)],
  },
});
````

#### **📌 SelectField**

```typescript
import { createField, SelectField } from 'ngx-dynamic-forms-factory';

createField<SelectField>({
  colSize: 'ui-col-span-12 sm:ui-col-span-4',
  controlType: SelectField,
  label: 'Country',
  selectOptions: [
    { id: 'us', name: 'United States' },
    { id: 'ca', name: 'Canada' },
  ],
  selectValue: 'id',
  selectLabel: 'name',
  options: {
    formControlName: 'country',
    value: '',
    validators: [],
  },
});
```

#### **📌 UIElement**

```typescript
import { createField, UIElement } from 'ngx-dynamic-forms-factory';
import { CustomTitleComponent } from './custom-title.component';

createField<UIElement>({
  colSize: 'ui-col-span-12',
  controlType: CustomTitleComponent,
  data: { title: 'Personal Information' },
});
```

#### **📌 FieldGroup**

```typescript
import { createField, FieldGroup, InputField } from 'ngx-dynamic-forms-factory';

createField<FieldGroup>({
  colSize: 'ui-col-span-12 sm:ui-col-span-4',
  group: [
    createField<InputField>({
      colSize: 'ui-col-span-12',
      controlType: InputField,
      label: 'Email',
      placeholder: 'example@email.com',
      type: 'email',
      options: {
        formControlName: 'email',
        value: '',
        validators: [Validators.email, Validators.required],
      },
    }),
    ... // Other fields
  ],
});
```

#### **📌 GenericField**

```typescript
import { createField, GenericField } from 'ngx-dynamic-forms-factory';

interface CustomToggleField extends GenericField {
  myCustomOption: string;
}
```
