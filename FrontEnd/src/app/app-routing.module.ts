import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { FormularioRegistroUsuarioComponent} from './components/formulario-registro-usuario/formulario-registro-usuario.component';
import { ContactanosPageComponent} from './components/contactanos-page/contactanos-page.component';
import { SeccionesUsuarioComponent } from './components/secciones-usuario/secciones-usuario.component';
import { InicioPacienteComponent } from './components/inicio-paciente/inicio-paciente.component';
import { SidenavPacienteComponent } from './components/sidenav-paciente/sidenav-paciente.component';
import { CalendarioUsuarioComponent } from './components/calendario-usuario/calendario-usuario.component';
import { LoginAdministradorComponent } from './components/login-administrador/login-administrador.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { DoctoresComponent } from './components/doctores/doctores.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './protected/dashboard/dashboard.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { FormularioRegistroDoctorComponent } from './components/formulario-registro-doctor/formulario-registro-doctor.component';
import { DashboardDoctorComponent } from './components/dashboard-doctor/dashboard-doctor.component';
import { CalendarioDoctorComponent } from './components/calendario-doctor/calendario-doctor.component';

const routes: Routes = [

  //RUTAS PARA LAS ACCIONES DEL USUARIO CUALQUIERA
  { path: '', redirectTo:'user/login-user', pathMatch:'full'},
  { path: 'user/login-user', component:BienvenidaComponent},
  { path: 'user/registrar-paciente', component: FormularioRegistroUsuarioComponent},
  { path: 'user/registrar-doctor', component: FormularioRegistroDoctorComponent},
  { path: 'user/contactanos', component: ContactanosPageComponent},

//RUTAS PARA LAS ACCIONES DEL PACIENTE
  { path: 'paciente/inicio-usuario', component: SeccionesUsuarioComponent},
  { path: 'paciente/doctores', component: SidenavPacienteComponent},
  { path: 'paciente/calendario-usuario', component: CalendarioUsuarioComponent},

//RUTAS PARA LAS ACCIONES DEL ADMINISTRADOR
  { path: 'admin/login-admin', component: LoginAdministradorComponent},
  { path: 'admin/listar-pacientes', component: PacientesComponent},
  { path: 'admin/listar-doctores', component: DoctoresComponent},

//RUTAS PARA LAS ACCIONES DEL DOCTOR
  { path: 'doctor/login-doctor', component: DoctorLoginComponent},
  { path: 'doctor/dashboard-doctor', component: DashboardDoctorComponent},
  { path: 'doctor/calendario-doctor', component: CalendarioDoctorComponent},

//RUTAS PROTEGIDAS
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  }


//FIN RUTAS
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
