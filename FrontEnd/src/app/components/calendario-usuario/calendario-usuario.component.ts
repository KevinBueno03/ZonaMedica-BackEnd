import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugins from '@fullcalendar/daygrid';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-calendario-usuario',
  templateUrl: './calendario-usuario.component.html',
  styleUrls: ['./calendario-usuario.component.css']
})
export class CalendarioUsuarioComponent implements OnInit {

  calendario: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'es',
    events: [
      { title: 'Cita Doctora Grey', date: '2021-10-05'},
      { title: 'Cita Doctor Hunt', date: '2021-10-09'},
      { title: 'Cita Doctora Yang', date: '2021-10-28' },
      { title: 'Cita Doctor Avery', date: '2021-10-29' }
    ]
  };


 constructor() {

  }

  ngOnInit(): void {
  }

}
