import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentiComponent } from './presenti.component';

describe('PresentiComponent', () => {
  let component: PresentiComponent;
  let fixture: ComponentFixture<PresentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
