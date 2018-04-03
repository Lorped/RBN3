import { TestBed, inject } from '@angular/core/testing';

import { ListpresentiService } from './listpresenti.service';

describe('ListpresentiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListpresentiService]
    });
  });

  it('should be created', inject([ListpresentiService], (service: ListpresentiService) => {
    expect(service).toBeTruthy();
  }));
});
