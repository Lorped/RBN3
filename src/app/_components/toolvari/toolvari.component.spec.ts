import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolvariComponent } from './toolvari.component';

describe('ToolvariComponent', () => {
  let component: ToolvariComponent;
  let fixture: ComponentFixture<ToolvariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolvariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolvariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
