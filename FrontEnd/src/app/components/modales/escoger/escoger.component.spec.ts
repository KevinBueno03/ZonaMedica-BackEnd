import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerComponent } from './escoger.component';

describe('EscogerComponent', () => {
  let component: EscogerComponent;
  let fixture: ComponentFixture<EscogerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscogerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscogerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
