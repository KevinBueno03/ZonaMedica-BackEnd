import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPacienteComponent } from './sidenav-paciente.component';

describe('SidenavPacienteComponent', () => {
  let component: SidenavPacienteComponent;
  let fixture: ComponentFixture<SidenavPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
