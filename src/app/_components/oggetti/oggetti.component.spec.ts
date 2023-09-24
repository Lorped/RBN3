import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OggettiComponent } from './oggetti.component';

describe('OggettiComponent', () => {
  let component: OggettiComponent;
  let fixture: ComponentFixture<OggettiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OggettiComponent]
    });
    fixture = TestBed.createComponent(OggettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
