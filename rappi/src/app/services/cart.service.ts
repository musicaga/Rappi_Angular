import { Injectable, EventEmitter } from '@angular/core';
import { IOrder, IOrderItem } from '../interfaces/order';
import * as moment from 'moment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  updateCart: EventEmitter<IOrder> = new EventEmitter();
  constructor(
    private snackbarService: SnackbarService
  ) { }

  addProduct(orderItem: IOrderItem, action: string) {
    const order = JSON.parse(localStorage.getItem('rappi_angular_order'));
    const currentOrder = order ? { ...order } :  {
      orderItems: [],
      id: moment().unix(),
      status: 'NEW',
      customer: null,
      total: null
    };
    const orderItemExist = currentOrder.orderItems.find(orderItemItem => orderItemItem.product.id === orderItem.product.id);
    if (action === 'EDIT') {
      currentOrder.orderItems = currentOrder.orderItems.map(orderItemItem => {
        return orderItemItem.product.id === orderItem.product.id
          ? { ...orderItemItem, order_item_quantity: orderItem.order_item_quantity }
          : orderItemItem;
      })
      this.snackbarService.message('Product edited', null);
    } else {
      if (orderItemExist) {
        currentOrder.orderItems = currentOrder.orderItems.map(orderItemItem => {
          return orderItemItem.product.id === orderItem.product.id
            ? { ...orderItemItem, order_item_quantity: orderItemItem.order_item_quantity + orderItem.order_item_quantity }
            : orderItemItem;
        })
      } else {
        orderItem.order_item_id = moment().unix();
        currentOrder.orderItems.push(orderItem);
      }
      this.snackbarService.message('Product added', null);
    }
    let total = 0;
    currentOrder.orderItems.forEach(item => {
      total += (item.order_item_quantity * item.product.price);
    })
    currentOrder.total = total.toFixed(2);
    currentOrder.status = 'PENDING';
    this.setOrder(currentOrder);
    this.updateOrders(currentOrder);
  }

  deleteOrderItem(orderItem: IOrderItem) {
    const order = JSON.parse(localStorage.getItem('rappi_angular_order'));
    order.orderItems = order.orderItems.filter(orderItemItem => orderItemItem.order_item_id !== orderItem.order_item_id)
    this.snackbarService.message('Product deleted', null);
    this.setOrder(order);
    this.updateOrders(order);
  }

  payOrder() {
      const order = JSON.parse(localStorage.getItem('rappi_angular_order'));
      order.status = 'PAID';
      this.updateOrders(order);
      localStorage.removeItem('rappi_angular_order');
      this.setOrder({
        orderItems: [],
        id: moment().unix(),
        status: 'NEW',
        customer: null,
        total: null
      });
      this.snackbarService.message('Order paid', null);
  }

  updateOrders(currentOrder: IOrder) {
    const order = JSON.parse(JSON.stringify(currentOrder));
    let orders = JSON.parse(localStorage.getItem('rappi_angular_orders'));
    if (orders) {
      const orderExist = orders.find(order => order.id === currentOrder.id);
      orders = orderExist ? orders.map(order => order.id === currentOrder.id ? currentOrder : order)
        : [ ...orders, currentOrder];
      this.setOrders(orders);
    } else {
      this.setOrders([order]);
    }
  }

  setOrder(order: IOrder) {
    localStorage.setItem('rappi_angular_order', JSON.stringify(order));
    this.updateCart.emit(order);
  }

  setOrders(orders: IOrder[]) {
    localStorage.setItem('rappi_angular_orders', JSON.stringify(orders));
  }
}
