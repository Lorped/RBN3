import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registra5Component } from './registra5.component';

describe('Registra5Component', () => {
  let component: Registra5Component;
  let fixture: ComponentFixture<Registra5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registra5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registra5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
