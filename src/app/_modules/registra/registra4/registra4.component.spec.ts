import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registra4Component } from './registra4.component';

describe('Registra4Component', () => {
  let component: Registra4Component;
  let fixture: ComponentFixture<Registra4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registra4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registra4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
