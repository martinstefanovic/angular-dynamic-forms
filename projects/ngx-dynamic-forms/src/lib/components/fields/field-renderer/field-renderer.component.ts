import { CommonModule } from '@angular/common';
import { Component, input, ViewContainerRef, viewChild, inject, OnInit } from '@angular/core';
import { injectFormFactoryConfig } from '../../../config/config.token';
import { UnknownFieldComponent } from '../../unknown-field/unknown-field.component';

@Component({
  selector: 'lib-field-renderer',
  imports: [CommonModule],
  template: `<ng-container />`,
})
export class FieldRendererComponent implements OnInit {
  private readonly _config = injectFormFactoryConfig();

  field = input<any>();
  dynamicHost = viewChild<ViewContainerRef>('dynamicField');
  viewContainer = inject(ViewContainerRef);

  ngOnInit() {
    this.viewContainer.clear();
    if (typeof this.field().controlType === 'string') {
      this.renderComponentByAlias();
    } else {
      this.renderComponent();
    }
  }

  private renderComponentByAlias() {
    const alias = this._config.aliases.find((alias) => alias.alias === this.field().controlType);
    if (alias) {
      const container: any = this.viewContainer.createComponent(alias.component);
      if (this.field().options) {
        container.setInput('field', this.field());
      }
      if (this.field().data) {
        container.setInput('data', this.field().data);
      }
    } else {
      this.viewContainer.createComponent(UnknownFieldComponent);
    }
  }

  private renderComponent() {
    const container: any = this.viewContainer.createComponent(this.field().controlType);
    if (this.field().options) {
      container.setInput('field', this.field());
    }
    if (this.field().data && container?.instance?.data) {
      container.setInput('data', this.field().data);
    }
  }
}
