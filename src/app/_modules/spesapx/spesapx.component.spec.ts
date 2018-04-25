import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesapxComponent } from './spesapx.component';

describe('SpesapxComponent', () => {
  let component: SpesapxComponent;
  let fixture: ComponentFixture<SpesapxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpesapxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpesapxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
