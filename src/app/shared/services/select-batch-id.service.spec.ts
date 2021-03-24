import { TestBed } from '@angular/core/testing';

import { SelectBatchIdService } from './select-batch-id.service';

describe('SelectBatchIdService', () => {
  let service: SelectBatchIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectBatchIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
