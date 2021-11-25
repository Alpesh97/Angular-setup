import { TestBed } from '@angular/core/testing';

import { CoreMemoryStorageService } from './core-memory-storage.service';

describe('CoreMemoryStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoreMemoryStorageService = TestBed.get(CoreMemoryStorageService);
    expect(service).toBeTruthy();
  });
});
