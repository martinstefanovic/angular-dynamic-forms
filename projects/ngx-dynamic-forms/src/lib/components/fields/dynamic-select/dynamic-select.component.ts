import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { CustomFieldComponent } from '../../custom-field/custom-field.component';
import { FieldErrorsComponent } from '../../field-errors/field-errors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldLabelComponent } from '../../field-label/field-label.component';

@Component({
  selector: 'lib-dynamic-select',
  imports: [FieldErrorsComponent, ReactiveFormsModule, CommonModule, FieldLabelComponent],
  template: ` @if(field()){
    <lib-field-label [field]="field()" />
    <div class="ui-relative ui-inline-block ui-text-left ui-w-full ui-h-10">
      <button
        class="ui-inline-flex ui-w-full ui-justify-between ui-rounded-md ui-bg-white ui-px-4 ui-py-2 ui-text-sm ui-font-medium ui-text-gray-700 ui-shadow-sm ui-ring-1 ui-ring-gray-300 ui-transition hover:ui-bg-gray-100"
        (click)="toggleDropdown()"
      >
        @if(!selected()){
        {{ findDefaultOptionLabel(field().selectOptions)?.[field().selectLabel] || field().placeholder || '' }}
        }
        {{ selected() || field().placeholder || '' }}
        <span class="ui-ml-2 ui-inline-block ui-transform ui-ml-auto" [class.ui-rotate-180]="isOpen()">▼</span>
      </button>

      @if(isOpen()){
      <div
        class="ui-absolute ui-mt-2 ui-w-full ui-rounded-md ui-bg-white ui-shadow-lg ui-ring-1 ui-ring-gray-200 ui-z-10"
      >
        <div class="ui-py-1 ui-text-sm ui-text-gray-700">
          @for( option of field().selectOptions; track option[this.field().selectValue]){
          <button
            (click)="selectOption(option)"
            class="ui-block ui-w-full ui-text-left ui-px-4 ui-py-2 ui-transition hover:ui-bg-gray-100"
          >
            {{ option[field().selectLabel] }}
          </button>
          }
        </div>
      </div>
      }
    </div>
    <lib-field-errors [errors]="control?.errors" />
    }`,
})
export class DynamicSelectComponent extends CustomFieldComponent implements OnInit, OnDestroy {
  isOpen = signal(false);
  selected = signal<string | null>(null);
  dropdownOptions = computed(() => this.field()?.selectOptions);
  subscriptions: any[] = [];

  ngOnInit() {
    this.subscribeToValueChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  selectOption(option: string) {
    this.selected.set(option[this.field().selectLabel]);
    this.updateValue(option[this.field().selectValue]);
    this.isOpen.set(false);
  }

  findDefaultOptionLabel(options: any[]) {
    return options.find((option: any) => option[this.field().selectValue] === this.field().options.value);
  }

  private subscribeToValueChanges() {
    this.subscriptions.push(
      this.control?.valueChanges.subscribe((value) => {
        this.selected.set(this.findLabelForValue(value));
      })
    );
  }

  private findLabelForValue(value: any) {
    return this.field().selectOptions.find((option: any) => option[this.field().selectValue] === value)?.[
      this.field().selectLabel
    ];
  }
}
