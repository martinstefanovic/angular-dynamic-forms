import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './form-factory/components/form-fields/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormExampleComponent } from './form-example/form-example.component';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaComponent } from './form-factory/components/form-fields/textarea/textarea.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormFactoryCoreComponent } from './form-factory/components/form-factory-core/form-factory-core.component';
import { FieldErrorsComponent } from './form-factory/components/form-fields/field-errors/field-errors.component';
import { ButtonModule } from 'primeng/button';
import { FormFactoryComponent } from './form-factory/components/form-factory/form-factory.component';
import { DropdownComponent } from './form-factory/components/form-fields/dropdown/dropdown.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    FormExampleComponent,
    TextareaComponent,
    FormFactoryCoreComponent,
    FieldErrorsComponent,
    FormFactoryComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
