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

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component:BienvenidaComponent},
  { path: 'api/register', component: FormularioRegistroUsuarioComponent},
  { path: 'contactanos', component: ContactanosPageComponent},
  { path: 'inicio-usuario', component: SeccionesUsuarioComponent},
  { path: 'doctores', component: SidenavPacienteComponent},
  { path: 'calendario-usuario', component: CalendarioUsuarioComponent},
  { path: 'login-admin', component: LoginAdministradorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
