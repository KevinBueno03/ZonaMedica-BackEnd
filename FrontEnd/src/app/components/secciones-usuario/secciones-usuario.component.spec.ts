import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionesUsuarioComponent } from './secciones-usuario.component';

describe('SeccionesUsuarioComponent', () => {
  let component: SeccionesUsuarioComponent;
  let fixture: ComponentFixture<SeccionesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionesUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
