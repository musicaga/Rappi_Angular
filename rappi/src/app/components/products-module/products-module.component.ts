import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductsDialogComponent } from 'src/app/components/products-dialog/products-dialog.component';

@Component({
  selector: 'app-products-module',
  templateUrl: './products-module.component.html',
  styleUrls: ['./products-module.component.css']
})
export class ProductsModuleComponent implements OnInit {
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
