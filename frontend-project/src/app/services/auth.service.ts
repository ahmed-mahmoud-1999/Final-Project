import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlPath = "http://localhost:3000"
  public loginFlag = false;
  public isAdmin = false;
  constructor(private http: HttpClient) { }

  handlePost(endPoint:string, obj:any): Observable<any> {
    return this.http.post(`${this.urlPath}${endPoint}`, obj);
  }
  handleGet(endPoint:string, obj:any): Observable<any> {
    return this.http.get(`${this.urlPath}${endPoint}`, obj);
  }
  handlePut(endPoint:string, obj:any): Observable<any> {
    return this.http.put(`${this.urlPath}${endPoint}`, obj);
  }
  handleDelete(endPoint: string, obj:any): Observable<any> {
    return this.http.delete(`${this.urlPath}${endPoint}`, obj);
  }

}
