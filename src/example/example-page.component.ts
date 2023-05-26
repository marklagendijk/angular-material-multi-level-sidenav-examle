import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './example-page.component.html',
  imports: [AsyncPipe, RouterLink],
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
