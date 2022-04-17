import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { InputComponent } from './form-factory/components/form-fields/input/input.component';

@Component({
  selector: 'app-root',
  template: `<app-form-example></app-form-example>`,
  styles: [`
  ::ng-deep body{
    padding: 2rem;
  }`]
})
export class AppComponent {}
