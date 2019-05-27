import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') sidebar: MatDrawer;
  title = 'rappi';
  constructor(
    private router: Router
  ){}

  goto(route: string) {
    this.router.navigate([route]);
    this.sidebar.toggle();
  }
}
