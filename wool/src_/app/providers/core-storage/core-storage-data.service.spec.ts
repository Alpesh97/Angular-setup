import { TestBed } from '@angular/core/testing';

import { CoreStorageDataService } from './core-storage-data.service';

describe('CoreStorageDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreStorageDataService = TestBed.get(CoreStorageDataService);
    expect(service).toBeTruthy();
  });
});
