import { TestBed, inject } from '@angular/core/testing';

import { QuestpxService } from './questpx.service';

describe('QuestpxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestpxService]
    });
  });

  it('should be created', inject([QuestpxService], (service: QuestpxService) => {
    expect(service).toBeTruthy();
  }));
});
