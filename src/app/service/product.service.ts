import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.class';
import { Vendor } from '../model/vendor.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:8080/products/';

  constructor(private http: HttpClient) {
  }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  get(id: string): Observable<JsonResponse> {
    return this.http.get(this.url + id) as Observable<JsonResponse>;
  }

  getFromVendor(vendor: string): Observable<JsonResponse> {
    return this.http.get(this.url + 'from-vendor/' + vendor) as Observable<JsonResponse>;
  }

  create(product: Product): Observable<JsonResponse> {
    return this.http.post(this.url, product) as Observable<JsonResponse>;
  }

  update(product: Product): Observable<JsonResponse> {
    return this.http.put(this.url, product) as Observable<JsonResponse>;
  }

  delete(product: Product): Observable<JsonResponse> {
    return this.http.delete(this.url + product.id) as Observable<JsonResponse>;
  }
}
