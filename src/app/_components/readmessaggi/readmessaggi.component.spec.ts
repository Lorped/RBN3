import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmessaggiComponent } from './readmessaggi.component';

describe('ReadmessaggiComponent', () => {
  let component: ReadmessaggiComponent;
  let fixture: ComponentFixture<ReadmessaggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadmessaggiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadmessaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
