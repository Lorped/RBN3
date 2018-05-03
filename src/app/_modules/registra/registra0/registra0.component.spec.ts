import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registra0Component } from './registra0.component';

describe('Registra0Component', () => {
  let component: Registra0Component;
  let fixture: ComponentFixture<Registra0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registra0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registra0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
