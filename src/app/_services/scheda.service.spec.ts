import { TestBed, inject } from '@angular/core/testing';

import { SchedaService } from './scheda.service';

describe('SchedaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedaService]
    });
  });

  it('should be created', inject([SchedaService], (service: SchedaService) => {
    expect(service).toBeTruthy();
  }));
});
