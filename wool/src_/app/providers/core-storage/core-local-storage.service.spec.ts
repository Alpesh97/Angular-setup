import { TestBed } from '@angular/core/testing';

import { CoreLocalStorageService } from './core-local-storage.service';

describe('CoreLocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreLocalStorageService = TestBed.get(CoreLocalStorageService);
    expect(service).toBeTruthy();
  });
});
