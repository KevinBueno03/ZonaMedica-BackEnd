import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Pacientes } from "./pacientes.model";

@Injectable({
  providedIn: 'root'
})

export class PacienteService{

  private listaPacientes: Pacientes[]=[
{firstName: 'Sofia', firstLastName: 'Valladares', hn_id: '0801-2000-03105', email: 'sofia@gmail.com'},
{firstName: 'Juanita', firstLastName: 'Alvarez', hn_id: '1502-1989-28988', email: 'mari@fmmf'},
{firstName: 'Kevin', firstLastName: 'Bueno', hn_id: '1767-1999-28989', email: 'kevin@gmail.com'},
  ];

  pacienteSubject = new Subject<Pacientes>();

  obtenerPacientes(){
    return this.listaPacientes.slice();
  }

  guardarPaciente(paciente: Pacientes){
    this.listaPacientes.push(paciente);
    this.pacienteSubject.next(paciente);
  }

}
