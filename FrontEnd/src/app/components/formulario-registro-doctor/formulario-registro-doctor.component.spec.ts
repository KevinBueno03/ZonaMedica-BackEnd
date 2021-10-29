import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRegistroDoctorComponent } from './formulario-registro-doctor.component';

describe('FormularioRegistroDoctorComponent', () => {
  let component: FormularioRegistroDoctorComponent;
  let fixture: ComponentFixture<FormularioRegistroDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRegistroDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRegistroDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
