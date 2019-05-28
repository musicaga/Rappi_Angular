import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, Route } from '@angular/router';

interface IRoute {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') sidebar: MatDrawer;
  routes: IRoute[] = [];
  constructor(
    private router: Router
  ) {
    this.routes = [
      {
        name: 'Pos',
        path: '/pos',
        icon: 'shopping_cart'
      },
      {
        name: 'Orders',
        path: '/orders',
        icon: 'list'
      }
    ]
  }

  goto() {
    this.sidebar.toggle();
  }
}
