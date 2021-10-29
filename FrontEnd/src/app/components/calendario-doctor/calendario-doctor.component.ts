import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugins from '@fullcalendar/daygrid';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendario-doctor',
  templateUrl: './calendario-doctor.component.html',
  styleUrls: ['./calendario-doctor.component.css']
})
export class CalendarioDoctorComponent implements OnInit {

  calendario: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'es',
    events: [
      { title: 'Cita Paciente Sofia Videa', date: '2021-10-04'},
      { title: 'Cita Paciente Fersy', date: '2021-10-11'},
      { title: 'Cita Paciente Kevin Bueno', date: '2021-10-28', hour:'8:00 p.m' },
      { title: 'Cita Paciente Isaac Rivas', date: '2021-10-29' }
    ]
  };
  constructor() { }

  ngOnInit(): void {
  }

}
