import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDuplicateDialogComponent } from './email-duplicate-dialog.component';

describe('EmailDuplicateDialogComponent', () => {
  let component: EmailDuplicateDialogComponent;
  let fixture: ComponentFixture<EmailDuplicateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDuplicateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailDuplicateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
