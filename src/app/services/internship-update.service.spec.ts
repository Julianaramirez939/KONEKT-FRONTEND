import { TestBed } from '@angular/core/testing';

import { InternshipUpdateService } from './internship-update.service';

describe('InternshipUpdateService', () => {
  let service: InternshipUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternshipUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
