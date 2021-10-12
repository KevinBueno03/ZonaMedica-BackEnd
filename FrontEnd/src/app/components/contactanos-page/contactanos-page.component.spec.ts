import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactanosPageComponent } from './contactanos-page.component';

describe('ContactanosPageComponent', () => {
  let component: ContactanosPageComponent;
  let fixture: ComponentFixture<ContactanosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactanosPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactanosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
