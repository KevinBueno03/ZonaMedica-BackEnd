import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRegistroUsuarioComponent } from './formulario-registro-usuario.component';

describe('FormularioRegistroUsuarioComponent', () => {
  let component: FormularioRegistroUsuarioComponent;
  let fixture: ComponentFixture<FormularioRegistroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRegistroUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
