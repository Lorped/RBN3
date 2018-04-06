import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mappa0Component } from './mappa0.component';

describe('Mappa0Component', () => {
  let component: Mappa0Component;
  let fixture: ComponentFixture<Mappa0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mappa0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mappa0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
