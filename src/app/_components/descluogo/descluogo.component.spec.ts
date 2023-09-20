import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescluogoComponent } from './descluogo.component';

describe('DescluogoComponent', () => {
  let component: DescluogoComponent;
  let fixture: ComponentFixture<DescluogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescluogoComponent]
    });
    fixture = TestBed.createComponent(DescluogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
