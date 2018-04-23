import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestpxComponent } from './questpx.component';

describe('QuestpxComponent', () => {
  let component: QuestpxComponent;
  let fixture: ComponentFixture<QuestpxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestpxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestpxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
