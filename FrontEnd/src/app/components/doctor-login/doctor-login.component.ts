import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private _router: Router, private _userService: UserService) {
    this.formLoginDoctor = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  submitted: boolean = false;
  get formAdmin() {
    return this.formLoginDoctor.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formLoginDoctor.invalid) {
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

}
