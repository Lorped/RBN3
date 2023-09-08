import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubforumComponent } from './subforum.component';

describe('SubforumComponent', () => {
  let component: SubforumComponent;
  let fixture: ComponentFixture<SubforumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubforumComponent]
    });
    fixture = TestBed.createComponent(SubforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
