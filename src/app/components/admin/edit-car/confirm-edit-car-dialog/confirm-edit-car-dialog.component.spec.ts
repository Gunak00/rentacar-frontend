import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditCarDialogComponent } from './confirm-edit-car-dialog.component';

describe('ConfirmEditCarDialogComponent', () => {
  let component: ConfirmEditCarDialogComponent;
  let fixture: ComponentFixture<ConfirmEditCarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEditCarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEditCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
