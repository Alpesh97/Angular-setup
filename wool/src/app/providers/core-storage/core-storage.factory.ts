import { InjectionToken } from '@angular/core';

import { CoreLocalStorageService } from './core-local-storage.service';
import { CoreMemoryStorageService } from './core-memory-storage.service';
import { ConstantKey, StorageType } from './core-storage.classes';
import { ICoreStorageService } from './core-storage.service';

export const SESSION_STORAGE = new InjectionToken<ICoreStorageService>(ConstantKey.SESSION_STORAGE);
export const LOCAL_STORAGE = new InjectionToken<ICoreStorageService>(ConstantKey.LOCAL_STORAGE);
export const MEMORY_STORAGE = new InjectionToken<ICoreStorageService>(ConstantKey.MEMORY_STORAGE);

export const GLOBAL_SET_STORAGE = LOCAL_STORAGE;

export const storageFactory = (storageType: StorageType): ICoreStorageService => {
    switch (storageType) {
        case StorageType.Local:
            return new CoreLocalStorageService(localStorage);
        case StorageType.Session:
            return new CoreLocalStorageService(sessionStorage);
        default:
            return new CoreMemoryStorageService();
    }
};
