import { TestBed } from '@angular/core/testing';

import { OggettiService } from './oggetti.service';

describe('OggettiService', () => {
  let service: OggettiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OggettiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
