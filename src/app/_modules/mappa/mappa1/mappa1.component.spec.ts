import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mappa1Component } from './mappa1.component';

describe('Mappa1Component', () => {
  let component: Mappa1Component;
  let fixture: ComponentFixture<Mappa1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mappa1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mappa1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
