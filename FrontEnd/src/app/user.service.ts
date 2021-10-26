import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  registrar(body:any){
    return this._http.post('http://127.0.0.1:4300/api/register',body,{
      observe:"body",
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login_Usuario(body:any){
    return this._http.post('http://127.0.0.1:4300/api/loginUser',body,{
      observe:"body",
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login_Admin(body:any){
    return this._http.post('http://127.0.0.1:4300/api/loginAdmin',body,{
      observe:"body",
      headers: new HttpHeaders().append('Content-Type','application/json')
    });
  }

}
