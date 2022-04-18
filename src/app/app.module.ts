import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormExampleComponent } from './form-example/form-example.component';
import { FormFactoryModule } from './form-factory/form-factory.module';

import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, FormExampleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormFactoryModule.forRoot({
      fields: [],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
