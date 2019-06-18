import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) {
  }

  list(): Observable<JsonResponse> {
    return this.http.get(this.url) as Observable<JsonResponse>;
  }

  create(user: User): Observable<JsonResponse> {
    return this.http.post(this.url, user) as Observable<JsonResponse>;
  }

  get(id: string): Observable<JsonResponse> {
    return this.http.get(this.url + id) as Observable<JsonResponse>;
  }

  update(user: User): Observable<JsonResponse> {
    return this.http.put(this.url, user) as Observable<JsonResponse>;
  }

  delete(user: User): Observable<JsonResponse> {
    return this.http.delete(this.url + user.id) as Observable<JsonResponse>;
  }
}
