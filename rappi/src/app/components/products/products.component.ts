import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../interfaces/category';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public loading: boolean = false;
  search = new FormControl();
  categoriesList: ICategory[] = [];
  products: IProduct[] = [];
  list = false;
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.search.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.categoryService.setSearch(value);
        this.loadCategories();
      })

    this.subscriptions.push(
      this.categoryService.load.subscribe(() => {
        this.loadCategories()
      })
    );
  }

  loadCategories() {
    this.loading = true;
    setTimeout(() => {
      const data = this.categoryService.getProductsByCategories();
      this.categoriesList = data.categories;
      this.products = data.products;
      this.loading = false;
    }, 400);
  }

  togglelist() {
    this.list = !this.list;
  }

  toggleAction() {
    this.toggle.emit();
  }
}
