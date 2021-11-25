import { TestBed } from '@angular/core/testing';

import { ReceivalService } from './receival.service';

describe('ReceivalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReceivalService = TestBed.get(ReceivalService);
    expect(service).toBeTruthy();
  });
});
