import { Injectable } from "@angular/core";
import { Doctores } from "./doctores.model";

@Injectable({
  providedIn: 'root'
})

export class DoctorService{

  private listaDoctores: Doctores[]=[
{
medAppointment_modality_inHouse:'false',
medAppointment_modality_inClinic:'true',
medAppointment_modality_online:'true',
firstName: 'Sofia',
secondName:'Gineth',
firstLastName: 'Valladares',
secondLastName:'Videa',
hn_id: '0801-2000-03105',
department:'Francisco Morazan',
email: 'sofia@gmail.com',
password:'asd.45678',
phone:'89213037',
bibliography:'Doctora en otra vida',
master_degree:'Muchos je'}
  ];

  obtenerDoctores(){
    return this.listaDoctores.slice();
  }


}
