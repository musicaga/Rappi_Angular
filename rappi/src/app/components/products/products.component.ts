import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../interfaces/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categoriesList: ICategory[] = [];
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesList = this.categoryService.getProductsByCategories();
  }
}
