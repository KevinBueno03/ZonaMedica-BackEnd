import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarioUsuarioComponent } from '../components/calendario-usuario/calendario-usuario.component';
import { NavbarUsuarioComponent } from '../components/navbar-usuario/navbar-usuario.component';
import { SeccionesUsuarioComponent } from '../components/secciones-usuario/secciones-usuario.component';
import { SidenavPacienteComponent } from '../components/sidenav-paciente/sidenav-paciente.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class ProtectedModule { }
