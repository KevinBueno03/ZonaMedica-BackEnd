import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.css']
})
export class LoginAdministradorComponent implements OnInit {


  formLoginAdmin: FormGroup;
  hideA=true;

  constructor(private formBuilder: FormBuilder, private _router: Router, private _userService: UserService) {
    this.formLoginAdmin = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      passwordAdmin: new FormControl('', Validators.required)
    });
  }

  submitted: boolean = false;
  get formAdmin() {
    return this.formLoginAdmin.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formLoginAdmin.invalid) {
      return;
    }
  }


  ngOnInit(): void {
  }


  sweetAlertSuccess() {
    Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
  }

  sweetAlertError() {
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }


  olvidoContra() {
    Swal.fire('¡Lastima!', 'Ni modo wey, asi es la vida ):', 'error');
  }


  loginAdmin() {
    if (!this.formLoginAdmin.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this._userService.login_Admin(JSON.stringify(this.formLoginAdmin.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/inicio-usuario']); this.sweetAlertSuccess() },
        error => {console.log(error); this.sweetAlertError()}
      )
    console.log(JSON.stringify(this.formLoginAdmin.value));
  }

}
