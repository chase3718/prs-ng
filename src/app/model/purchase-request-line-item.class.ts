import { PurchaseRequest } from './purchase-request.class';
import { Product } from './product.class';
import { NumberSymbol } from '@angular/common';

export class PurchaseRequestLineItem {
    id: number;
    purchaseRequest: PurchaseRequest;
    product: Product;
    quantity: number;

    constructor(id: number = 0, purchaseRequest: PurchaseRequest = null, product: Product = null,
                quantity: number = 0) {
        this.id = id;
        this.purchaseRequest = purchaseRequest;
        this.product = product;
        this.quantity = quantity;
    }
}