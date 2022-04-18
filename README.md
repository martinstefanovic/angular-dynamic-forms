![](https://badgen.net/badge/Version/1.0/f2a) ![](https://badgen.net/badge/Open-Source/FREE/red) ![](https://badgen.net/badge/Last-update/18.4.2022/blue)

# Angular Dynamic Forms

Angular component that allows the creation of dynamic forms. You can use this component in situations where you get the configuration for the form from an external API or if you just hate HTML 😀

<img src="./form.png" alt="Angular dynamic form img">

## List of features

> `UI Style` — for UI I used [PrimeNG](https://www.primefaces.org/primeng/#/) but you can use any Angular UI Library.

> `Grid layout` — for grid I used [PrimeFLEX](https://www.primefaces.org/primeflex/)

- 🦾 Dynamically created form only from JSON configuration
- 😎 Full gird layout for forms
- 🤖 Dummy fields without UI input fields
- 🍀 You can group fields in same column
- 💥 Validation error messages
- 💥 Custom patterns for field value & custom error messages
- 🏗 Responsive forms
- 👇 Easy to [add more supported fields](#add-more-fields)

#### Supported fields by default

> You can add more by yourself!

| Field    | Selector / `controlType` | Description       |
| -------- | ------------------------ | ----------------- |
| Input    | `input`                  | Text input field. |
| Textarea | `textarea`               | Textarea field.   |
| Dropdown | `dropdown`               | Dropdown field.   |
| Checkbox | `checkbox`               | Checkbox field.   |

## Installation

Clone repo and run:

```shell
npm install
```

```shell
ng serve -o
```

## Usage

There are two ways you can use dynamic forms. The first way is if you have no additional controls other than those in the configuration.

### Import module

You can copy the entire form-factory folder into your project and then import `FormFactoryModule` in `app.module.ts`

```typescript
  FormFactoryModule.forRoot({
    fields: [],
  }),
```

#### Example 1

```typescript
  constructor(
    public formFactory: FormFactoryService
  ) {}

  ngOnInit(): void {
    /**
    * Call formFactory service and pass form fields
    * JSON configuration to create new form group
    */
    this.exampleForm = this.formFactory.createForm(this.exampleFields);
    /**
    * Example how to add additional formControl
    * to form ifyou need
    */
    this.exampleForm.addControl('id', new FormControl(1, Validators.required));
  }
```

```HTML
  <app-form-factory
    [form]="exampleForm"
    [fields]="exampleFields"
  ></app-form-factory>
```

#### Example 2

If you want to insert dynamic fields into one control and add the rest of the field via the form builder, you can do so as follows.

```typescript
  constructor(
    private fb: FormBuilder,
    public formFactory: FormFactoryService
  ) {}

  ngOnInit(): void {
    this.exampleForm = this.fb.group({
      dynamic: this.formFactory.createForm(this.exampleFields),
      id: ['1', Validators.required],
    });
  }
```

```HTML
  <app-form-factory
    [form]="formFactory.getFormGroup(exampleForm,'dynamic')"
    [fields]="exampleFields"
  ></app-form-factory>
```

## Available configuration

### Configuration for exsisting fields

General config options description:

| Option            | Description                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `controlType`     | Selector for your form field                                                                                                  |
| `colSize`         | Look at primeflex documentation to see all grid layout classes - [PrimeFLEX](https://www.primefaces.org/primeflex/gridsystem) |
| `options`         | This options is used to create form field                                                                                     |
| `containerClass`  | You can add custom CSS class to field container                                                                               |
| `label`           | Form field label                                                                                                              |
| `placeholder`     | Form field placeholder                                                                                                        |
| `formControlName` | Angular reactive forms control name                                                                                           |
| `value`           | Default value for form field                                                                                                  |
| `disabled`        | Define is field disabled                                                                                                      |
| `required`        | Define is field required                                                                                                      |
| `maxLength`       | Define field max length                                                                                                       |
| `pattern`         | Regex pattern for field                                                                                                       |

#### `Input` field

- controlType: `input`

```json
{
  "controlType": "input",
  "colSize": "col-12 sm:col-4",
  "options": {
    "containerClass": "mb-0", // Optional
    "label": "Title",
    "placeholder": "Enter title", // Optional
    "formControlName": "title",
    "value": "", // Optional - default is ''
    "disabled": false, // Optional
    "validators": {
      // Optional
      "required": true,
      "maxLength": 200
    }
  }
}
```

#### `Textarea` field

- controlType: `textarea`

| Option | Description             |
| ------ | ----------------------- |
| `rows` | Number of textarea rows |

```json
{
  "colSize": "col-12 sm:col-3",
  "controlType": "textarea",
  "options": {
    "containerClass": "mb-0", // Optional
    "label": "Description",
    "placeholder": "My description", // Optional
    "formControlName": "description",
    "value": "", // Optional - default is ''
    "rows": 5, // Optional
    "disabled": false, // Optional
    "validators": {
      // Optional
      "required": true,
      "maxLength": 200
    }
  }
}
```

#### `Dropdown` field

- controlType: `dropdown`

| Option            | Description                             |
| ----------------- | --------------------------------------- |
| `optionValue`     | The value to be displayed when selected |
| `optionLabel`     | The label to be displayed when selected |
| `dropdownOptions` | Array with options                      |
| `value`           | Default value                           |

```json
{
  "colSize": "col-12",
  "controlType": "dropdown",
  "options": {
    "label": "List",
    "placeholder": "Chose", // Optional
    "formControlName": "someList",
    "optionValue": "value",
    "optionLabel": "label",
    "dropdownOptions": [
      {
        "label": "Item 1",
        "value": 1
      }
    ],
    "value": []
  }
}
```

#### `Checkbox` field

- controlType: `checkbox`

```json
{
  "colSize": "col-12 sm:col-3",
  "controlType": "checkbox",
  "options": {
    "label": "Remember me",
    "formControlName": "remember",
    "value": true // Optional
  }
}
```

#### Custom `regex` pattern

`errorMessage` - This message will be displayed if pattern not matched.

```json
{
  "controlType": "input",
  "colSize": "col-12 sm:col-4",
  "options": {
    ...
    "errorMessage": "Please enter a number from 1 to 9",
    "validators": {
      "pattern": "^[0-9]*$", // Any regex pattern
      "required": true,
      "maxLength": 200
    }
  }
}
```

#### Dummy fields

This fields doesn`t have UI representation, they just exist in angular form builder.

```json
  [
  ...
  {
    "dummyFields": [
      {
        "options": {
          "formControlName": "dummyField",
          "value": "Hello!",
        },
      },
      {
        "options": {
          "formControlName": "myId",
          "value": "",
        },
      },
    ],
  },
  ...
  ]
```

### Group fields in grid layout

This is example configuration from the image at the top of the documentation.
Use `group` array to pass all the fields you want to be in the same column. Inside group you don't need to define `colSize` option because it is already defined for the whole group.

```json
fields:FormFactoryModel[] = [
  {
  "colSize": "col-12 sm:col-4",
  "group": [
    {
      "controlType": "input",
      "options": {...}
    }
    {
      "controlType": "input",
      "options": {...}
    }
  ]
},
{
  "colSize": "col-12 sm:col-4",
  "controlType": "textarea",
  "options": {...}
},
{
  "colSize": "col-12 sm:col-4",
  "group": [
    {
      "controlType": "dropdown",
      "options": {...}
    }
    {
      "controlType": "checkbox",
      "options": {...}
    }
  ]
}
]
```

### Add more fields

This system supports some form fields by default (see above). If you want to add fields you can do that in `forRoot({})` configuration:

```typescript
  @NgModule({
    declarations: [...],
    imports: [
      ...
      FormFactoryModule.forRoot({
        fields: [
          {
            type: 'my-custom-field',
            component: MyCustomFieldComponent
          }
        ],
      }),
    ],
    ...
  })
  export class AppModule {}
```

> **IMPORTANT** - If you want to add your custom field please open some of exsisting form-fields in `form-factory/components/form-fields` folder and follow the same component structure.

> Note that if you want you can pass any form field you created like in example above.

> `type` - Selector that you use for `controlType` option in JSON configuration.

> `component` - Angular component

# Contributing

If you want to contribute to a project and make it better, your help is very welcome. Contributing is also a great way to learn more about social coding on Github, new technologies and and their ecosystems and how to make constructive, helpful bug reports, feature requests and the noblest of all contributions: a good, clean pull request.

# About me

| Linkedin 👋                                                | Instagram                                        |
| ---------------------------------------------------------- | ------------------------------------------------ |
| [Martin S.](https://www.linkedin.com/in/martinstefanovic/) | [@maki.stf](https://www.instagram.com/maki.stf/) |
