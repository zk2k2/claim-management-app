import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmBoxComponent } from './delete-confirm-box.component';

describe('DeleteConfirmBoxComponent', () => {
  let component: DeleteConfirmBoxComponent;
  let fixture: ComponentFixture<DeleteConfirmBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmBoxComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
