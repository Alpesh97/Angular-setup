import { TestBed } from '@angular/core/testing';

import { CoreStorageService } from './core-storage.service';

describe('CoreStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreStorageService = TestBed.get(CoreStorageService);
    expect(service).toBeTruthy();
  });
});
