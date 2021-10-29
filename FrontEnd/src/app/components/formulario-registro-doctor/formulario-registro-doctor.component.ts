import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-registro-doctor',
  templateUrl: './formulario-registro-doctor.component.html',
  styleUrls: ['./formulario-registro-doctor.component.css']
})
export class FormularioRegistroDoctorComponent implements OnInit {


  closeResult = '';
  registrarDoctor: FormGroup;
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
  //rutas: Routes[];
/*
  registrarDoctor: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    firstLastName: new FormControl('', Validators.required),
    secondName: new FormControl(''),
    secondLastName: new FormControl('', Validators.required),
    hn_id: new FormControl('', Validators.required),
    department: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    terminos: new FormControl('', Validators.required),
    politicas: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })

  constructor(private _router: Router, private _userService: UserService) { }

  */

  ngOnInit(): void {
  }


    constructor(private formBuilder: FormBuilder, private _router: Router, private _userService: UserService, private modalService: NgbModal) {
      this.registrarDoctor = this.formBuilder.group({
        firstName: new FormControl('', Validators.required),
        firstLastName: new FormControl('', Validators.required),
        secondName: new FormControl(''),
        secondLastName: new FormControl('', Validators.required),
        hn_id: new FormControl('', Validators.required),
        department: new FormControl('', Validators.required),
        email: new FormControl('',[Validators.required, Validators.email]),
        terminos: new FormControl('', Validators.required),
        politicas: new FormControl('',Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('',Validators.required),
        phone: new FormControl('',Validators.required),
        medAppointment_modality_inHouse: new FormControl(false),
        medAppointment_modality_inClinic: new FormControl(false),
        medAppointment_modality_online: new FormControl(false),
        master_degree: new FormControl('', Validators.required),
        bibliography: new FormControl('', Validators.required)
      }, {
        validators: this.MustMatch('password', 'confirmPassword')
      });
    }

/* Validaciones Handle de errores.
Email validar que ese correo no este en uso
*/


get formularioDoctor() {
  return this.registrarDoctor.controls;
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


registrarDoctores() {
  if (!this.registrarDoctor.valid) {
    console.log('Formulario Invalido');
    return;
  }
  this._userService.registrarDoctores(JSON.stringify(this.registrarDoctor.value))
    .subscribe(
      data => { console.log(data); this.sweetAlertRegistroSuccess() ;this._router.navigate(['/user/login-user'])},
      error => {console.log(error); this.sweetAlertRegistroError()}
    )
  console.log(JSON.stringify(this.registrarDoctor.value));
}

onSubmit() {
  this.submittedPaciente=true;
  if (this.registrarDoctor.invalid) {
    return;
  }
}

//INICIO FUNCIONES PARA MODALES

openLg(content:any) {
  this.modalService.open(content, { size: 'lg' });
}

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
  Swal.fire('¡Muy Bien!', 'Te hemos enviado un correo para que valides tu cuenta', 'success');
}

sweetAlertRegistroError() {
  Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
}

sweetAlertLoginSuccess() {
  Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
}

sweetAlertLoginError() {
  Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
}
}
