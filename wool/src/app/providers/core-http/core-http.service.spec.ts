import { TestBed } from '@angular/core/testing';

import { CoreHttpService } from './core-http.service';

describe('CoreHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreHttpService = TestBed.get(CoreHttpService);
    expect(service).toBeTruthy();
  });
});
