import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  @ViewChild('filters') sidebar: MatDrawer;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.sidebar.toggle();
  }
}
