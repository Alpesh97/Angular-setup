import { TestBed } from '@angular/core/testing';

import { StowageService } from './stowage.service';

describe('StowageService', () => {
  let service: StowageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StowageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
