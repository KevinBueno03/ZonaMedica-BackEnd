import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EscogerComponent } from '../modales/escoger/escoger.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  closeResult = '';
  formLogin: FormGroup;
  hideP=true;
  isVisible: any;
  isSelected: boolean = true;
  public isCollapsedD = true;
  public isCollapsedP = true;



  constructor(private formBuilder: FormBuilder, private _router: Router, private _userService: UserService, private modalService: NgbModal) {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      passwordLogin: new FormControl('', Validators.required)
    });
  }

  submitted: boolean = false;
  get form() {
    return this.formLogin.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formLogin.invalid) {
      return;
    }
  }


  ngOnInit(): void {
  }

  loginUsuario() {
    if (!this.formLogin.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this._userService.login_Usuario(JSON.stringify(this.formLogin.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/inicio-usuario']); this.sweetAlertSuccess() },
        error => {console.log(error); this.sweetAlertError()}
      )
    console.log(JSON.stringify(this.formLogin.value));
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


  sweetAlertSuccess() {
    Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
  }

  sweetAlertError() {
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }

}
