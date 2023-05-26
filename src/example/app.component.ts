import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavMenuComponent } from './sidenav-menu.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
<app-sidenav-menu>
  <router-outlet></router-outlet>
</app-sidenav-menu>`,
  imports: [RouterOutlet, SidenavMenuComponent],
})
export class AppComponent {}
