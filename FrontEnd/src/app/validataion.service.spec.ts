import { TestBed } from '@angular/core/testing';

import { ValidataionService } from './validataion.service';

describe('ValidataionService', () => {
  let service: ValidataionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidataionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
