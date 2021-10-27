import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EscogerComponent } from '../modales/escoger/escoger.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-paciente',
  templateUrl: './inicio-paciente.component.html',
  styleUrls: ['./inicio-paciente.component.css']
})
export class InicioPacienteComponent implements OnInit {

  closeResult = '';
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  sweetAlertSuccessCita() {
    Swal.fire('¡Cita Agendada!', 'Gracias por tu confianza', 'success');
  }

  sweetAlertErrorCita() {
    Swal.fire('¡Upps!', 'Hubo un error al crear tu cita', 'error');
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

}
