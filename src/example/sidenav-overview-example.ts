import * as _ from 'lodash';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NestedTreeControl } from '@angular/cdk/tree';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

/** @title Basic sidenav */
@Component({
  selector: 'sidenav-overview-example',
  templateUrl: 'sidenav-overview-example.html',
  styleUrls: ['sidenav-overview-example.css'],
  standalone: true,
  imports: [NgIf, MatSidenavModule],
})
export class SidenavOverviewExample {
  menuTreeControl = new NestedTreeControl<MenuItem>(
    (menuItem) => menuItem.children
  );

  menuItems: MenuItem[] = [
    { type: 'link', link: 'home', name: 'Home' },
    {
      type: 'section',
      name: 'SubItems 1',
      children: [
        { type: 'link', link: 'item-1', name: 'Item 1' },
        { type: 'link', link: 'item-2', name: 'Item 2' },
      ],
    },
    {
      type: 'section',
      name: 'SubItems 2',
      children: [
        { type: 'link', link: 'item-3', name: 'Item 3' },
        { type: 'link', link: 'item-4', name: 'Item 4' },
      ],
    },
  ];

  constructor(private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.openActiveRouteParentMenuItem());
  }

  openActiveRouteParentMenuItem() {
    _.forEach(this.menuItems, (parentMenuItem: MenuItem) => {
      const childMenuItems = this.menuTreeControl.getChildren(
        parentMenuItem
      ) as MenuItem[];
      _.forEach(childMenuItems, (childMenuItem: MenuItem) => {
        if (
          this.router.isActive(childMenuItem.link as string, {
            paths: 'subset',
            queryParams: 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored',
          })
        ) {
          this.menuTreeControl.expand(parentMenuItem);
        }
      });
    });
  }

  hasChild = (_: number, menuItem: MenuItem) => !!menuItem.children?.length;
}

interface MenuItem {
  type: 'link' | 'section';
  name: string;
  link?: string;
  children?: MenuItem[];
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
