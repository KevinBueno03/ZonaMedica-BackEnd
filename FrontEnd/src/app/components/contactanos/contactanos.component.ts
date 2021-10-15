import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'sweetAlert';
  mostrarSweet() {
    Swal.fire('¡Muy Bien!', 'Pronto nos pondremos en contacto contigo.', 'success');
  }

}
