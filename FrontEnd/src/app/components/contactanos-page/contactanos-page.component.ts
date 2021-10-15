import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactanos-page',
  templateUrl: './contactanos-page.component.html',
  styleUrls: ['./contactanos-page.component.css']
})
export class ContactanosPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'sweetAlert';
  mostrarSweet() {
    Swal.fire('¡Muy Bien!', 'Pronto nos pondremos en contacto contigo.', 'success');
  }

  probarSweet(){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}

