import { FieldTypeModel } from './../../core/models/field-type';
import { DynamicField } from './../../core/models/dynamic-field';
import {
  Component,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilderService } from '../../core/services/form-builder.service';

@Component({
  selector: 'app-form-factory-core',
  template: `<ng-template #appDynamic></ng-template>`,
})
export class FormFactoryCoreComponent implements OnInit {
  /**
   * Form field container
   */
  @ViewChild('appDynamic', { read: ViewContainerRef, static: true })
  private dynamicHost!: ViewContainerRef;
  /**
   * Form field options
   */
  @Input() field!: any;

  constructor(private formFactoryService: FormBuilderService) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    if (this.field.dummyFields) {
      /**
       * If field is dummy fields (Fields that don`t have UI), then
       * don`t load component
       */
      return;
    }
    this.dynamicHost.clear();
    const componentRef = this.dynamicHost?.createComponent<any>(
      this.componentTypeFactory(this.field.controlType)
    );
    componentRef.instance.options = this.field.options;
  }

  private componentTypeFactory(type: string): Type<DynamicField> {
    const field = this.formFactoryService.fields.filter(
      (field: FieldTypeModel) => field.type === type
    )[0];
    return field.component;
  }
}
