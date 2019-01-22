import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoteriComponent } from './poteri.component';

describe('PoteriComponent', () => {
  let component: PoteriComponent;
  let fixture: ComponentFixture<PoteriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoteriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoteriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
