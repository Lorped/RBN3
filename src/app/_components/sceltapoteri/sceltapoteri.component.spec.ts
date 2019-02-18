import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceltapoteriComponent } from './sceltapoteri.component';

describe('SceltapoteriComponent', () => {
  let component: SceltapoteriComponent;
  let fixture: ComponentFixture<SceltapoteriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceltapoteriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceltapoteriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
