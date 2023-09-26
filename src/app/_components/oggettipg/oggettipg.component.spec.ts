import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OggettipgComponent } from './oggettipg.component';

describe('OggettipgComponent', () => {
  let component: OggettipgComponent;
  let fixture: ComponentFixture<OggettipgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OggettipgComponent]
    });
    fixture = TestBed.createComponent(OggettipgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
