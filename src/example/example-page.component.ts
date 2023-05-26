import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  template: `
  <h1>The selected page is: {{ title$ | async }}</h1>
  <p>Select one of the sub menu items and press reload to see that the parent of the active page will automatically be expanded.
  `,
  imports: [AsyncPipe],
})
export class ExamplePageComponent {
  title$: Observable<string>;

  constructor(router: Router, titleService: Title) {
    this.title$ = router.events.pipe(
      startWith(titleService.getTitle()),
      delay(0),
      map(() => titleService.getTitle())
    );
  }
}
