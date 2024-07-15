import { TestBed } from '@angular/core/testing';

import { WetherdataService } from './wetherdata.service';

describe('WetherdataService', () => {
  let service: WetherdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WetherdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
