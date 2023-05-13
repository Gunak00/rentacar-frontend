import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurFleetComponent } from './our-fleet.component';

describe('RentCarComponent', () => {
  let component: OurFleetComponent;
  let fixture: ComponentFixture<OurFleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurFleetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
