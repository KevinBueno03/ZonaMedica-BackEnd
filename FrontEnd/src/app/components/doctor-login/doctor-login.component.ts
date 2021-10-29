import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent implements OnInit {

  formLoginDoctor: FormGroup;
  hideA=true;

  constructor(private formBuilder: FormBuilder, private _router: Router, private _userService: UserService, private authService: AuthService) {
    this.formLoginDoctor = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  submitted: boolean = false;
  get formDoctor() {
    return this.formLoginDoctor.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formLoginDoctor.invalid) {
      return;
    }
  }

  //Inicio Funciones Login Logout Doctor

  logoutPaciente(){
    this._router.navigateByUrl('/doctor/login-doctor');
    this.authService.logoutDoctor();
  }

  logDoctor(){
    /*this.authService.validarToken()
    .subscribe(resp=> console.log(resp));
    */
    console.log(this.formLoginDoctor.value);
    const {email, password}= this.formLoginDoctor.value;
    this.authService.loginDoctor(email, password)
    .subscribe( resp =>{
      if(resp){
        this._router.navigateByUrl('/doctor/dashboard-doctor');
      }else{
        //mostrar mensaje de error
        this.sweetAlertLoginError();
      }
      //console.log(resp);
    });
    //this._router.navigateByUrl('/dashboard');
  }


//Fin Login LogoutDoctor


  ngOnInit(): void {
  }


  sweetAlertSuccess() {
    Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
  }

  sweetAlertLoginError() {
    Swal.fire('¡Upps!', 'Revisa que tu usuario y contraseña estén bien escritos.', 'error');
  }


  olvidoContra() {
    Swal.fire('¡Lastima!', 'Ni modo wey, asi es la vida ):', 'error');
  }


  /*
  loginDoctor() {
    if (!this.formLoginDoctor.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this._userService.login_Admin(JSON.stringify(this.formLoginDoctor.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/inicio-usuario']); this.sweetAlertSuccess() },
        error => {console.log(error); this.sweetAlertError()}
      )
    console.log(JSON.stringify(this.formLoginDoctor.value));
  }
*/
}
