import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registra3Component } from './registra3.component';

describe('Registra3Component', () => {
  let component: Registra3Component;
  let fixture: ComponentFixture<Registra3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registra3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registra3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
