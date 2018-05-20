import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagrafeComponent } from './anagrafe.component';

describe('AnagrafeComponent', () => {
  let component: AnagrafeComponent;
  let fixture: ComponentFixture<AnagrafeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnagrafeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagrafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
