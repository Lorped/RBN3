import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registra2Component } from './registra2.component';

describe('Registra2Component', () => {
  let component: Registra2Component;
  let fixture: ComponentFixture<Registra2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registra2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registra2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
