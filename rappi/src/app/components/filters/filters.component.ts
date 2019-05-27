import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { availableData, quantityData, priceData, sortData } from 'src/app/data/filters';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  availableOptions = availableData; 
  quantityOptions = quantityData;
  priceOptions = priceData;
  sortOptions = sortData;
  filters: FormGroup;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  constructor(
    public categoriesService: CategoryService
  ) { 
    this.filters = new FormGroup({
      available: new FormControl(this.categoriesService.filters.available),
      quantity: new FormControl(this.categoriesService.filters.quantity),
      price: new FormControl(this.categoriesService.filters.price),
      sort: new FormControl(this.categoriesService.filters.sort) 
    });
  }

  ngOnInit() {
  }
  
  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  done(){
    this.categoriesService.setFilters(this.filters.value);
    this.categoriesService.load.emit(true);
    this.toggle.emit();
  }
}
