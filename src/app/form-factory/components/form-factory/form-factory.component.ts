import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-factory',
  template: ` <!-- * MAIN FORM -->
    <section class="grid" [ngClass]="styleClass" [formGroup]="form">
      <ng-container *ngFor="let field of fields">
        <!-- * IF - group of fields -->
        <ng-container *ngIf="field.group; else elseTemplate">
          <!-- * Define column size -->
          <div [class]="field.colSize">
            <ng-container *ngFor="let subfield of field.group">
              <!-- * Find and use type of control -->
              <app-form-factory-core [field]="subfield"></app-form-factory-core>
            </ng-container>
          </div>
        </ng-container>
        <!-- * IF - single field -->
        <ng-template #elseTemplate>
          <!-- * Define column size -->
          <div [class]="field.colSize">
            <app-form-factory-core [field]="field"></app-form-factory-core>
          </div>
        </ng-template>
      </ng-container>
    </section>`,
  styles: [
    `
      ::ng-deep app-form-builder {
        width: 100%;
      }
    `,
  ],
})
export class FormFactoryComponent {
  /**
   * @decription
   * Form factory is a component that works by passing it the JSON configuration
   * for the formand it itself creates the entire layout of the form and all the fields.
   * More about form factory system you can find here:
   * https://github.com/martinstefanovic/angular-dynamic-forms
   */

  /**
   * Inputs
   *
   * @form This is main FormGroup
   * @fields All form fields
   * @styleClass CSS classes for main grid container
   */
  @Input() form!: FormGroup;
  @Input() fields: any;
  @Input() styleClass!: string;
}
