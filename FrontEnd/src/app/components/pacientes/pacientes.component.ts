import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from './pacientes.service';
import { Pacientes } from './pacientes.model';
import { MatTableDataSource } from '@angular/material/table';
import { ViewApi } from '@fullcalendar/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit, AfterViewInit {

  pacientesData: Pacientes[] = [];
  desplegarColumnas=["firstName","firstLastName","hn_id","email","estado","desactivar","editar"];
  dataSource = new MatTableDataSource<Pacientes>();
  closeResult = '';
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

  @ViewChild(MatSort)
  ordenamiento!: MatSort;

  @ViewChild(MatPaginator)
  paginacion !: MatPaginator;
  constructor(private pacientesService: PacienteService, private formBuilder: FormBuilder, private _router: Router, private _userService: UserService,private modalService: NgbModal, private pacienteService: PacienteService) {
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
   }

  hacerFiltro(filtro: string){
    this.dataSource.filter= filtro;
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

  onSubmit() {
    this.submittedPaciente=true;
    if (this.reactiveForm.invalid) {
      return;
    }
  }

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
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }


  //FIN ALERTAS


  ngOnInit(): void {
    //this.pacientesData = this.pacientesService.obtenerPacientes();
    this.dataSource.data=this.pacientesService.obtenerPacientes();
  }

  ngAfterViewInit(){
    this.dataSource.sort= this.ordenamiento;
    this.dataSource.paginator= this.paginacion;
  }



}
