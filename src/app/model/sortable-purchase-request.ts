import { User } from './user.class';
import { PurchaseRequest } from './purchase-request.class';

export class SortablePurchaseRequest {
    id: number;
    user: User;
    description: string;
    justification: string;
    dateNeeded: Date;
    deliveryMode: string;
    status: string;
    total: number;
    submittedDate: Date;
    reasonForRejection: string;
    userName: string;

    constructor(purchaseRequest: PurchaseRequest) {
        this.id = purchaseRequest.id;
        this.user = purchaseRequest.user;
        this. description = purchaseRequest.description;
        this.justification = purchaseRequest.justification;
        this.dateNeeded = purchaseRequest.dateNeeded;
        this.deliveryMode = purchaseRequest.deliveryMode;
        this.status = purchaseRequest.status;
        this.submittedDate = purchaseRequest.submittedDate;
        this.reasonForRejection = purchaseRequest.reasonForRejection;
        this.userName = purchaseRequest.user.userName;
    }
}