import { Injectable } from '@angular/core';
import Products from '../data/products';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {}

  getProducts() {
    const products: IProduct[] = JSON.parse(JSON.stringify(Products));
    return products.map(product => {
      const price = product.price.split('$')[1].replace(/[,]+/g, '.');
      return {
        ...product,
        price: Number(price)
      }
    });
  }
}
