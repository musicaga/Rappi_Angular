import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsDialogComponent } from '../products-dialog/products-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsListComponent implements OnInit {
  @Input() products: IProduct[] = [];
  constructor(
    private cartService: CartService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addProduct(product: IProduct) {
    const dialogRef = this.dialog.open(ProductsDialogComponent, {
      width: '300px',
      height: '250px',
      data: {
        order_item_id: null,
        product,
        order_item_quantity: 0
      },
      autoFocus: false,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.cartService.addProduct(resp, 'ADD');
      }
    });
  }
}
