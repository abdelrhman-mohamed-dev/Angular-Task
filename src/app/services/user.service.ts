import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?page=${page}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`).pipe(
      map((response: any) => response.data)
    );
  }
}