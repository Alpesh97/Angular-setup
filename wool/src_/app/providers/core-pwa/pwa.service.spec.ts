import { TestBed } from '@angular/core/testing';

import { CorePwaService } from './pwa.service';

describe('PwaService', () => {
  let service: CorePwaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorePwaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
