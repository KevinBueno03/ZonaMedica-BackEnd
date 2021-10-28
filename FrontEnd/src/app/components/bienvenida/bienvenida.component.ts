
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EscogerComponent } from '../modales/escoger/escoger.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  closeResult = '';
  formLogin: FormGroup;
  reactiveForm: FormGroup;
  //formLoginDoctor: FormGroup;
  hideP=true;
  isVisible: any;
  isSelected: boolean = true;
  public isCollapsedD = true;
  public isCollapsedP = true;
  submittedPaciente: boolean=false;
  submitted: boolean = false;
  hide=true;
  hideC=true;


  ngOnInit(): void {
  }


  constructor(private formBuilder: FormBuilder, private formularioPacientes: FormBuilder,private _router: Router, private _userService: UserService, private modalService: NgbModal, private authService: AuthService) {
    this.reactiveForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      firstLastName: new FormControl('', Validators.required),
      secondName: new FormControl(''),
      secondLastName: new FormControl('', Validators.required),
      hn_id: new FormControl('', Validators.required),
      department: new FormControl(''),
      emailPaciente: new FormControl('',[Validators.required, Validators.email]),
      terminos: new FormControl('', Validators.required),
      politicas: new FormControl('',Validators.required),
      passwordPaciente: new FormControl('', Validators.required),
      confirmPasswordPaciente: new FormControl('', Validators.required),
    }, {
      validators: this.MustMatch('passwordPaciente', 'confirmPasswordPaciente')
    });

    this.formLogin = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    /*
    this.formLoginDoctor = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      passwordLogin: new FormControl('', Validators.required)
    }); */

  }




  get formularioPaciente() {
    return this.reactiveForm.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      } if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }



  ch(e: any) {
    if (e.checked) {
      this.formLogin.controls['password'].setValidators([Validators.required])
      this.formLogin.controls['password'].updateValueAndValidity()
    } else {
      this.formLogin.controls['password'].setValidators(null)
      this.formLogin.controls['password'].updateValueAndValidity()
    }
  }

  registrarPaciente() {
    if (!this.reactiveForm.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this._userService.registrarPaciente(JSON.stringify(this.reactiveForm.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/']); this.sweetAlertRegistroSuccess() },
        error => {console.log(error); this.sweetAlertRegistroError()}
      )
    console.log(JSON.stringify(this.reactiveForm.value));
  }


  //Fin Funciones de Registro Paciente*/

  //INICIO LOGIN PACIENTE
  onSubmit() {
    this.submitted = true;
    this.submittedPaciente=true;
    if (this.formLogin.invalid) {
      return;
    }
  }


  get form() {
    return this.formLogin.controls;
  }

  logPaciente(){
    console.log(this.formLogin.value);
    const {email, password}= this.formLogin.value;
    this.authService.loginPaciente(email, password)
    .subscribe( resp =>{
      if(resp){
        this._router.navigateByUrl('/inicio-usuario');
      }else{
        //mostrar mensaje de error
        this.sweetAlertLoginError();
      }
      //console.log(resp);
    });
    //this._router.navigateByUrl('/dashboard');
  }


  loginPaciente() {
    if (!this.formLogin.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this._userService.login_Usuario(JSON.stringify(this.formLogin.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/inicio-usuario']); this.sweetAlertLoginSuccess() },
        error => {console.log(error); this.sweetAlertLoginError()}
      )
    console.log(JSON.stringify(this.formLogin.value));
  }

  //FIN LOGIN PACIENTE


  //INICIO FUNCIONES PARA MODALES

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //FIN MODALES

  //INICIO ALERTAS

  sweetAlertRegistroSuccess() {
    Swal.fire('¡Muy Bien!', 'Te has registrado satisfactoriamente', 'success');
  }

  sweetAlertRegistroError() {
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }

  sweetAlertLoginSuccess() {
    Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
  }

  sweetAlertLoginError() {
    Swal.fire('¡Upps!', 'Revisa que tu correo y contraseña estén bien escritos', 'error');
  }


  //FIN ALERTAS
}
