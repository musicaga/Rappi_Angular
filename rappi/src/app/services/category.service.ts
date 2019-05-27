import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import Categories from '../data/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private productService: ProductService
  ) { }

  getCategories() {
    return JSON.parse(JSON.stringify(Categories));
  }

  getProductsByCategories() {
    let products = this.productService.getProducts();
    let categories = this.getCategories();
    products.forEach(product => {
      const subLevel = product.sublevel_id;
      categories.forEach(category => {
        category.sublevels.forEach(firstLevel => {
          if (firstLevel.id === subLevel) {
            firstLevel.products
              ? firstLevel.products.push(product)
              : firstLevel.products = [product];
          } else {
            if (firstLevel.sublevels) {
              firstLevel.sublevels.forEach(secondLevel => {
                if (secondLevel.id === subLevel) {
                  secondLevel.products
                    ? secondLevel.products.push(product)
                    : secondLevel.products = [product];
                } else {
                  if (secondLevel.sublevels) {
                    secondLevel.sublevels.forEach(lastLevel => {
                      if (lastLevel.id === subLevel) {
                        lastLevel.products
                          ? lastLevel.products.push(product)
                          : lastLevel.products = [product];
                      }
                    })
                  }
                }
              })
            }
          }
        })
      })
    })
    return !products.length ? [] : categories;
  }
}
