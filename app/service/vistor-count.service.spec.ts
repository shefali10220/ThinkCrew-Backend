import { TestBed } from '@angular/core/testing';

import { VistorCountService } from './vistor-count.service';

describe('VistorCountService', () => {
  let service: VistorCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistorCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
