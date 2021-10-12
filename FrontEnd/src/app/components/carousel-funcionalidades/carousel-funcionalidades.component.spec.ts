import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselFuncionalidadesComponent } from './carousel-funcionalidades.component';

describe('CarouselFuncionalidadesComponent', () => {
  let component: CarouselFuncionalidadesComponent;
  let fixture: ComponentFixture<CarouselFuncionalidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselFuncionalidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselFuncionalidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
