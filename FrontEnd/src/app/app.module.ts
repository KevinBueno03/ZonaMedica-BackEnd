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
import { NavbarUsuarioComponent } from './components/navbar-usuario/navbar-usuario.component';
import { SeccionesUsuarioComponent } from './components/secciones-usuario/secciones-usuario.component';
import { SidenavPacienteComponent } from './components/sidenav-paciente/sidenav-paciente.component';
import { InicioPacienteComponent } from './components/inicio-paciente/inicio-paciente.component';
import { CalendarioUsuarioComponent } from './components/calendario-usuario/calendario-usuario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LoginAdministradorComponent } from './components/login-administrador/login-administrador.component'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
]);


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
    NavbarUsuarioComponent,
    SeccionesUsuarioComponent,
    SidenavPacienteComponent,
    InicioPacienteComponent,
    CalendarioUsuarioComponent,
    LoginAdministradorComponent

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
    FullCalendarModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
