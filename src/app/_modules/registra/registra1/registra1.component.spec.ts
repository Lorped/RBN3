import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Registra1Component } from './registra1.component';

describe('Registra1Component', () => {
  let component: Registra1Component;
  let fixture: ComponentFixture<Registra1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Registra1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registra1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
