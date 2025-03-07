import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  template: ` <h1>{{ data().title }}</h1>`,
})
export class TitleComponent {
  data = input<any>();
}
