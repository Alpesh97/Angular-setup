import { TestBed } from '@angular/core/testing';

import { BalecaptureService } from './balecapture.service';

describe('BalecaptureService', () => {
  let service: BalecaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalecaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
