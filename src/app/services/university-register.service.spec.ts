import { TestBed } from '@angular/core/testing';

import { UniversityRegisterService } from './university-register.service';

describe('UniversityRegisterService', () => {
  let service: UniversityRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
