import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { AcercaDeNosotrosComponent } from './components/acerca-de-nosotros/acerca-de-nosotros.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormularioRegistroUsuarioComponent } from './components/formulario-registro-usuario/formulario-registro-usuario.component';
import { CarouselFuncionalidadesComponent } from './components/carousel-funcionalidades/carousel-funcionalidades.component';
import { ContactanosPageComponent } from './components/contactanos-page/contactanos-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EscogerComponent } from './components/modales/escoger/escoger.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { LoginAdministradorComponent } from './components/login-administrador/login-administrador.component';
import { PacienteService } from './components/pacientes/pacientes.service';
import { CalendarioUsuarioComponent } from './components/calendario-usuario/calendario-usuario.component';
import { DoctoresComponent } from './components/doctores/doctores.component';
import { NavbarUsuarioComponent } from './components/navbar-usuario/navbar-usuario.component';
import { SeccionesUsuarioComponent } from './components/secciones-usuario/secciones-usuario.component';
import { SidenavPacienteComponent } from './components/sidenav-paciente/sidenav-paciente.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { InicioPacienteComponent } from './components/inicio-paciente/inicio-paciente.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BienvenidaComponent,
    AcercaDeNosotrosComponent,
    ContactanosComponent,
    FooterComponent,
    FormularioRegistroUsuarioComponent,
    CarouselFuncionalidadesComponent,
    ContactanosPageComponent,
    EscogerComponent,
    LoginAdministradorComponent,
    DoctorLoginComponent,
    NavbarAdminComponent,
    PacientesComponent,
    DoctoresComponent,
    InicioPacienteComponent,
    CalendarioUsuarioComponent,
    NavbarUsuarioComponent,
    SeccionesUsuarioComponent,
    SidenavPacienteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [UserService, PacienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
