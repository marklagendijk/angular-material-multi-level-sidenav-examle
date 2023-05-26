import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { VERSION as CDK_VERSION } from '@angular/cdk';
import {
  VERSION as MAT_VERSION,
  MatNativeDateModule,
} from '@angular/material/core';
import { AppComponent } from './example/app.component';
import { ExamplePageComponent } from './example/example-page.component';

/* eslint-disable no-console */
console.info('Angular CDK version', CDK_VERSION.full);
console.info('Angular Material version', MAT_VERSION.full);

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule),
    provideRouter([
      { path: 'home', component: ExamplePageComponent, title: 'Home' },
      { path: 'item-1', component: ExamplePageComponent, title: 'Item 1' },
      { path: 'item-2', component: ExamplePageComponent, title: 'Item 2' },
      { path: 'item-3', component: ExamplePageComponent, title: 'Item 3' },
      { path: 'item-4', component: ExamplePageComponent, title: 'Item 4' },
      { path: '**', redirectTo: '/home', pathMatch: 'full' },
    ]),
  ],
}).catch((err) => console.error(err));
