import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IOrder, IOrderItem } from '../../interfaces/order';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductsDialogComponent } from 'src/app/components/products-dialog/products-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  order: IOrder;
  private subscriptions: Subscription[] = [];
  constructor(
    public cartService: CartService,
    public dialog: MatDialog
  ) {
    const order = JSON.parse(localStorage.getItem('rappi_angular_order'));
    this.order = order ? order : {
      orderItems: [],
      id: null,
      status: 'NEW',
      customer: null,
      total: null
    }
  }

  ngOnInit() {
    this.subscriptions.push(
      this.cartService.updateCart.subscribe(order => {
        this.order = order;
      })
    );
  }

  payOrder() {
    this.cartService.payOrder();
  }

  deleteOrderItem(orderItem: IOrderItem) {
    this.cartService.deleteOrderItem(orderItem);
  }

  editOrderItem(orderItem: IOrderItem) {
    const dialogRef = this.dialog.open(ProductsDialogComponent, {
      width: '300px',
      height: '250px',
      data: orderItem,
      autoFocus: false,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.cartService.addProduct(resp, 'EDIT');
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
