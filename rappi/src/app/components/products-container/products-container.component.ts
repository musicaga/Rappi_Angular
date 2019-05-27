import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from '../../interfaces/category';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {
  @Input() categoriesList: ICategory[] = [];
  constructor() { }

  ngOnInit() {
    // console.log(this.categoriesList);
  }
}
