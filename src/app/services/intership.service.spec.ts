import { TestBed } from '@angular/core/testing';

import { IntershipService } from './intership.service';

describe('IntershipService', () => {
  let service: IntershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
