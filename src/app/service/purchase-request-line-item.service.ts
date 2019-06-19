import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { HttpClient } from '@angular/common/http';
import { PurchaseRequestLineItem } from '../model/purchase-request-line-item.class';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestLineItemService {
  url = 'http://localhost:8080/purchase-request-line-items/';

  constructor(private http: HttpClient) {
  }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  create(purchaseRequestLineItem: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.post(this.url, purchaseRequestLineItem) as Observable<JsonResponse>;
  }

  get(id: string): Observable<JsonResponse> {
    return this.http.get(this.url + id) as Observable<JsonResponse>;
  }

  getFromPurchaseRequest(purchaseRequest: string): Observable<JsonResponse> {
    return this.http.get(this.url + 'from-purchase-request/' + purchaseRequest) as Observable<JsonResponse>;
  }

  update(purchaseRequestLineItem: PurchaseRequestLineItem): Observable<JsonResponse> {
    return this.http.put(this.url, purchaseRequestLineItem) as Observable<JsonResponse>;
  }

  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(this.url + id) as Observable<JsonResponse>;
  }
}
