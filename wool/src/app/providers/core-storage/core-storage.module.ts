import { NgModule } from '@angular/core';

import { CoreStorageDataService } from './core-storage-data.service';
import { StorageType } from './core-storage.classes';
import { LOCAL_STORAGE, MEMORY_STORAGE, SESSION_STORAGE, storageFactory } from './core-storage.factory';

@NgModule({
  providers: [
    CoreStorageDataService,
    { provide: SESSION_STORAGE, useFactory: () => storageFactory(StorageType.Session) },
    { provide: LOCAL_STORAGE, useFactory: () => storageFactory(StorageType.Local) },
    { provide: MEMORY_STORAGE, useFactory: () => storageFactory(StorageType.Memory) },
  ]
})
export class CoreStorageModule { }
