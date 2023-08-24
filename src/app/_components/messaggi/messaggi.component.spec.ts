import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessaggiComponent } from './messaggi.component';

describe('MessaggiComponent', () => {
  let component: MessaggiComponent;
  let fixture: ComponentFixture<MessaggiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessaggiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
