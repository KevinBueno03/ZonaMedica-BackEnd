import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenav-paciente',
  templateUrl: './sidenav-paciente.component.html',
  styleUrls: ['./sidenav-paciente.component.css']
})
export class SidenavPacienteComponent implements OnInit {

  //@Output() sidenavClose= new EventEmitter();
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


  /*
public onSidenavClose=()=>{
  this.sidenavClose.emit();
}
*/


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
