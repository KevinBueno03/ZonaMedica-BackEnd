import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Pacientes } from "./pacientes.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PacienteService{

  //baseUrl = environment.baseUrl;
  baseUrl= environment.APIBASEURL;
  private listaPacientes: Pacientes[]=[];

  private pacientesSubject = new Subject<Pacientes[]>();

  constructor(private http: HttpClient){}

  obtenerPacientes(){
    this.http.get<Pacientes[]>(this.baseUrl + 'api/listaPacientes')
    .subscribe((data)=>{
      this.listaPacientes=data;
      this.pacientesSubject.next([...this.listaPacientes]); //con el next va a refrescarse y obtener la nueva data del servidor
    });
    //return this.listaPacientes.slice();
  }

  //El componente que obtiene la lista ejecuta el actual listener porque es el que devuelve la data
  obtenerActualListener(){
    return this.pacientesSubject.asObservable();
  }


}
