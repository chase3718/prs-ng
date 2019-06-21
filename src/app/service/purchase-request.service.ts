import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { HttpClient } from '@angular/common/http';
import { PurchaseRequest } from '../model/purchase-request.class';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {
  url = 'http://localhost:8080/purchase-requests/';

  constructor(private http: HttpClient) {
  }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  submitNew(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.post(this.url + 'submit-new/', purchaseRequest) as Observable<JsonResponse>;
  }

  submitReview(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + 'submit-review', purchaseRequest) as Observable<JsonResponse>;
  }

  sendReject(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + 'reject', purchaseRequest) as Observable<JsonResponse>;
  }

  approve(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + 'approve', purchaseRequest) as Observable<JsonResponse>;
  }

  reopen(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url + 'reopen', purchaseRequest) as Observable<JsonResponse>;
  }

  create(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.post(this.url, purchaseRequest) as Observable<JsonResponse>;
  }

  get(id: string): Observable<JsonResponse> {
    return this.http.get(this.url + id) as Observable<JsonResponse>;
  }

  getFromUser(id: string): Observable<JsonResponse> {
    return this.http.get(this.url + 'user/' + id) as Observable<JsonResponse>;
  }

  update(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.put(this.url, purchaseRequest) as Observable<JsonResponse>;
  }

  delete(purchaseRequest: PurchaseRequest): Observable<JsonResponse> {
    return this.http.delete(this.url + purchaseRequest.id) as Observable<JsonResponse>;
  }
}
