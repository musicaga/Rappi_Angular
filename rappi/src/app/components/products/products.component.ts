import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../interfaces/category';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  search = new FormControl();
  categoriesList: ICategory[] = [];
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
      this.categoryService.load.subscribe( () => {
        this.loadCategories()
      })
    );
  }

  loadCategories() {
    this.categoriesList = this.categoryService.getProductsByCategories();
  }

  toggleAction() {
    this.toggle.emit();
  }
}
