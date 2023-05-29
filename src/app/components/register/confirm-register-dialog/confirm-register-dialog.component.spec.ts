import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegisterDialogComponent } from './confirm-register-dialog.component';

describe('ConfirmRegisterComponent', () => {
  let component: ConfirmRegisterDialogComponent;
  let fixture: ComponentFixture<ConfirmRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRegisterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
