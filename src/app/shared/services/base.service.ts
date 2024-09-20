import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  baseUrl: string = environment.baseURL;
  extraUrl: string = '';
  protected token: string | null = null;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }),
  };

  constructor(protected http: HttpClient) { }

  protected buildPath() {
    return this.baseUrl + this.extraUrl;
  }

  newToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
    this.token = token;
    this.updateHttpOptions();
  }

  setToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        this.updateHttpOptions();
      }
    }
  }

  clearToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
    this.token = null;
    this.updateHttpOptions();
  }

  private updateHttpOptions() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }),
    };
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  getAll() {
    this.setToken();
    return this.http.get<T[]>(this.buildPath(), this.httpOptions).pipe(catchError(this.handleError));
  }

  getOne(id: any) {
    this.setToken();
    return this.http.get<T>(`${this.buildPath()}/${id}`, this.httpOptions).pipe(catchError(this.handleError));
  }

  create(item: T) {
    this.setToken();
    return this.http.post<T>(this.buildPath(), item, this.httpOptions).pipe(catchError(this.handleError));
  }

  update(id: any, item: T) {
    this.setToken();
    return this.http.put<T>(`${this.buildPath()}/${id}`, item, this.httpOptions).pipe(catchError(this.handleError));
  }

  delete(id: any) {
    this.setToken();
    return this.http.delete<T>(`${this.buildPath()}/${id}`, { ...this.httpOptions, responseType: 'text' as 'json' }).pipe(catchError(this.handleError));
  }
}
