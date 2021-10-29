import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-doctor',
  templateUrl: './navbar-doctor.component.html',
  styleUrls: ['./navbar-doctor.component.css']
})
export class NavbarDoctorComponent implements OnInit {

  constructor(private _router: Router,private authService: AuthService){

  }
  logoutDoctor(){
    this._router.navigateByUrl('/doctor/login-doctor');
    this.authService.logoutDoctor();
  }


  ngOnInit(): void {
  }

}
