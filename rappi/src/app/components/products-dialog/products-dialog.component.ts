import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IOrderItem } from '../../interfaces/order';
import { CartService } from '../../services/cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.css']
})
export class ProductsDialogComponent implements OnInit {
  quantity;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<ProductsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IOrderItem
  ) {
    this.quantity = new FormControl(String(this.data.order_item_quantity));
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addProduct() {
    if (this.quantity.value !== '0') {
      this.data.order_item_quantity = Number(this.quantity.value);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.dialogRef.close(this.data);
      }, 400)
    }
  }
}
