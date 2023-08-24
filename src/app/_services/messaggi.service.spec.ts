import { TestBed } from '@angular/core/testing';

import { MessaggiService } from './messaggi.service';

describe('MessaggiService', () => {
  let service: MessaggiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessaggiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
