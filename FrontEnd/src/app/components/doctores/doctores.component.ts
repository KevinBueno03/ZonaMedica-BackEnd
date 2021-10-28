import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserService } from '../../user.service';
import { Doctores } from './doctores.model';
import { DoctorService } from './doctores.service';


@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent implements OnInit, AfterViewInit {

  pacientesData: Doctores[] = [];
  desplegarColumnas=["firstName","firstLastName","hn_id","estado","desactivar","editar", "archivo"];
  dataSource = new MatTableDataSource<Doctores>();
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

  @ViewChild(MatSort)
  ordenamiento!: MatSort;

  @ViewChild(MatPaginator)
  paginacion !: MatPaginator;
  constructor(private pacientesService: DoctorService, private formBuilder: FormBuilder, private _router: Router, private _userService: UserService,private modalService: NgbModal) {
    this.registrarDoctor = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      firstLastName: new FormControl('', Validators.required),
      secondName: new FormControl(''),
      secondLastName: new FormControl('', Validators.required),
      hn_id: new FormControl('', Validators.required),
      department: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
      terminos: new FormControl('', Validators.required),
      politicas: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('',Validators.required),
      medAppointment_modality_inHouse: new FormControl(''),
      medAppointment_modality_inClinic: new FormControl(''),
      medAppointment_modality_online: new FormControl(''),
      master_degree: new FormControl(''),
      bibliography: new FormControl('')

    });
   }

  hacerFiltro(filtro: string){
    this.dataSource.filter= filtro;
  }



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
        data => { console.log(data); this._router.navigate(['/admin']); this.sweetAlertRegistroSuccess() },
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
    this.dataSource.data=this.pacientesService.obtenerDoctores();
  }

  ngAfterViewInit(){
    this.dataSource.sort= this.ordenamiento;
    this.dataSource.paginator= this.paginacion;
  }



}
