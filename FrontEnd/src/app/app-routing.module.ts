import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { FormularioRegistroUsuarioComponent} from './components/formulario-registro-usuario/formulario-registro-usuario.component';
import { ContactanosPageComponent} from './components/contactanos-page/contactanos-page.component';
import { AcercaDeNosotrosComponent} from './components/acerca-de-nosotros/acerca-de-nosotros.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent},
  { path: 'api/register', component: FormularioRegistroUsuarioComponent},
  { path: 'contactanos', component: ContactanosPageComponent},
  { path: 'acerca-nosotros', component: AcercaDeNosotrosComponent},
  { path: 'formulario-usuario', component: FormularioRegistroUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
