import { TestBed } from '@angular/core/testing';

import { WarrantyService } from './warranty.service';

describe('WarrantyService', () => {
  let service: WarrantyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarrantyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
