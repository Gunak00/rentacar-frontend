import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReservationDialogComponent } from './confirm-reservation-dialog.component';

describe('ConfirmReservationDialogComponent', () => {
  let component: ConfirmReservationDialogComponent;
  let fixture: ComponentFixture<ConfirmReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmReservationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
