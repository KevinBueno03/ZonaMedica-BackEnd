import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, AbstractControl, NgForm, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-registro-usuario',
  templateUrl: './formulario-registro-usuario.component.html',
  styleUrls: ['./formulario-registro-usuario.component.css']
})
export class FormularioRegistroUsuarioComponent implements OnInit {

  reactiveForm: FormGroup;
  closeResult = '';
  constructor(private formBuilder: FormBuilder) {
    this.reactiveForm = this.formBuilder.group({
      p_nombre: new FormControl('', Validators.required),
      p_apellido: new FormControl('', Validators.required),
      s_apellido: new FormControl('', Validators.required),
      identidad: new FormControl('', Validators.required),
      correo: new FormControl('',[Validators.required, Validators.email]),
      terminos: new FormControl('', Validators.required),
      politicas: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }, {
      validators: this.MustMatch('password', 'confirmPassword')
    });
  }

  submitted: boolean = false;
  get f() {
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

  ngOnInit(): void {
  }

  ch(e: any) {
    if (e.checked) {
      this.reactiveForm.controls['password'].setValidators([Validators.required])
      this.reactiveForm.controls['password'].updateValueAndValidity()
    } else {
      this.reactiveForm.controls['password'].setValidators(null)
      this.reactiveForm.controls['password'].updateValueAndValidity()
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      return;
    }
  }

  title = 'sweetAlert';
  sweetAlertSuccess() {
    Swal.fire('¡Muy Bien!', 'Te has registrado satisfactoriamente.', 'success');
  }

  sweetAlertError() {
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }

}
