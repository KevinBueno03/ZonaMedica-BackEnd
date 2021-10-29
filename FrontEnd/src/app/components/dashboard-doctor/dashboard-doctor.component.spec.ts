import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDoctorComponent } from './dashboard-doctor.component';

describe('DashboardDoctorComponent', () => {
  let component: DashboardDoctorComponent;
  let fixture: ComponentFixture<DashboardDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
