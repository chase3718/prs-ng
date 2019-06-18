import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { HttpClient } from '@angular/common/http';
import { Vendor } from '../model/vendor.class';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  url = 'http://localhost:8080/vendors/';

  constructor(private http: HttpClient) {
  }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(id: string): Observable<JsonResponse> {
    return this.http.get(this.url + id) as Observable<JsonResponse>;
  }

  create(vendor: Vendor): Observable<JsonResponse> {
    return this.http.post(this.url, vendor) as Observable<JsonResponse>;
  }

  update(vendor: Vendor): Observable<JsonResponse> {
    return this.http.put(this.url, vendor) as Observable<JsonResponse>;
  }

  delete(vendor: Vendor): Observable<JsonResponse> {
    return this.http.delete(this.url + vendor.id) as Observable<JsonResponse>;
  }
}
