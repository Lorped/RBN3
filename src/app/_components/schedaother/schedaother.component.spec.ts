import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaotherComponent } from './schedaother.component';

describe('SchedaotherComponent', () => {
  let component: SchedaotherComponent;
  let fixture: ComponentFixture<SchedaotherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedaotherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedaotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
