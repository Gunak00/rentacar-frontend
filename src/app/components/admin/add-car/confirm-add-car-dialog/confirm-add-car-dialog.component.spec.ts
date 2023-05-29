import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddCarDialogComponent } from './confirm-add-car-dialog.component';

describe('ConfirmAddCarDialogComponent', () => {
  let component: ConfirmAddCarDialogComponent;
  let fixture: ComponentFixture<ConfirmAddCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAddCarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAddCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
