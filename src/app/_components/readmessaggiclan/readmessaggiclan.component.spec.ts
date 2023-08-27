import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmessaggiclanComponent } from './readmessaggiclan.component';

describe('ReadmessaggiclanComponent', () => {
  let component: ReadmessaggiclanComponent;
  let fixture: ComponentFixture<ReadmessaggiclanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadmessaggiclanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadmessaggiclanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
