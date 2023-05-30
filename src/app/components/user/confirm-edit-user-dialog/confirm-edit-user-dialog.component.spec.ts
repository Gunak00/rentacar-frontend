import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditUserDialogComponent } from './confirm-edit-user-dialog.component';

describe('ConfirmEditUserDialogComponent', () => {
  let component: ConfirmEditUserDialogComponent;
  let fixture: ComponentFixture<ConfirmEditUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmEditUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEditUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
