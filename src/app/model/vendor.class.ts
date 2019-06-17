import { Product } from './product.class';

export class Vendor {
    id: number;
    code: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    email: string;
    preApproved: boolean;

    constructor(id: number = 0, code: string = '', name: string = '', address: string = '', city: string = '',
                state: string = '', zip: string = '', phoneNumber: string = '', email: string = '', preApproved: boolean = false) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.preApproved = preApproved;
    }


}