import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthRespones, Usuario } from '../interfaces/interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string= environment.APIBASEURL;
  private _user!: Usuario;


  get usuario(){
    return {...this._user};
  }
  constructor(private http: HttpClient) { }

  loginPaciente(email: string, password:string){
    const url= `${this.baseUrl}/login?type=patients`;
    const body= { email,password};

    //Para que reorne el observable; el objeto. Con los mensajes exitoso o no
    return this.http.post<AuthRespones>(url, body)
    .pipe(
      tap(resp =>{
        if(resp.session_code){
          localStorage.setItem('token', resp.session_code!);
        }
      }),
      map( resp=> true),
      catchError( err => of(false))
    )
  }


  validarToken(){
    const url =`${this.baseUrl}/auth`;
    const headers= new HttpHeaders()
    .set('x-access-token', localStorage.getItem('token') || '');
    return this.http.get(url,{headers});
  }


}
