import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddthreadComponent } from './addthread.component';

describe('AddthreadComponent', () => {
  let component: AddthreadComponent;
  let fixture: ComponentFixture<AddthreadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddthreadComponent]
    });
    fixture = TestBed.createComponent(AddthreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
