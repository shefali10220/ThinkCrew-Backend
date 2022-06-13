import { TestBed } from '@angular/core/testing';

import { ViewInsuranceService } from './view-insurance.service';

describe('ViewInsuranceService', () => {
  let service: ViewInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
