import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar-usuario',
  templateUrl: './navbar-usuario.component.html',
  styleUrls: ['./navbar-usuario.component.css']
})
export class NavbarUsuarioComponent {

  /*
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
*/
@Output() public sidenavToggle = new EventEmitter();

constructor(private _router: Router,private authService: AuthService){

}
logoutPaciente(){
  this._router.navigateByUrl('login');
  this.authService.logoutPaciente();
}


ngOnInit(): void{
}


/*

  showMe:boolean=true;


  constructor(private observer: BreakpointObserver){

  }

  ngAfterViewInit(){
    this.sidenav.close();
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode='over';
        this.sidenav.close();
      }else{
        this.sidenav.mode='side';
        this.sidenav.open();
      }
    });
  }
*/

}
