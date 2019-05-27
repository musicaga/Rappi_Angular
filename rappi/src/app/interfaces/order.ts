import { IProduct } from './product';

export interface IOrder {
    id: number;
    orderItems: IOrderItem[];
    status: string,
    customer: ICustomer,
    total: number;
}

export interface IOrderItem {
    order_item_id: number;
    product: IProduct,
    order_item_quantity: number;
}