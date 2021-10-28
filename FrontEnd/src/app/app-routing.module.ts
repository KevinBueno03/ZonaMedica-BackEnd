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

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component:BienvenidaComponent},
  { path: 'api/register', component: FormularioRegistroUsuarioComponent},
  { path: 'contactanos', component: ContactanosPageComponent},
  { path: 'inicio-usuario', component: SeccionesUsuarioComponent},
  { path: 'doctores', component: SidenavPacienteComponent},
  { path: 'calendario-usuario', component: CalendarioUsuarioComponent},
  { path: 'login-admin', component: LoginAdministradorComponent},
  { path: 'admin/listar-pacientes', component: PacientesComponent},
  { path: 'admin/listar-doctores', component: DoctoresComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'login-doctor', component: DoctorLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
