import { Vendor } from './vendor.class';
import { Product } from './product.class';

export class SortableProduct {
    id: number;
    vendor: Vendor;
    partNumber: string;
    name: string;
    price: number;
    unit: string;
    photoPath: string;
    vendorName: string;

    set _vendorName(value: string) {
        this.vendorName = value;
    }

    constructor(product: Product = null) {
        this.id = product.id;
        this.vendor = product.vendor;
        this.partNumber = product.partNumber;
        this.name = product.name;
        this.price = product.price;
        this.unit = product.unit;
        this.photoPath = product.photoPath;
        this.vendorName = product.vendor.name;
    }

}