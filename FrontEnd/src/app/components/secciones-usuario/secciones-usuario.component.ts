import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-secciones-usuario',
  templateUrl: './secciones-usuario.component.html',
  styleUrls: ['./secciones-usuario.component.css']
})
export class SeccionesUsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sweetAlertSuccess() {
    Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
  }

  sweetAlertError() {
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }

}
