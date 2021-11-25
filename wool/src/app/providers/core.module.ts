import { NgModule } from '@angular/core';

import { CoreHttpModule } from './core-http/core-http.module';
import { CorePwaModule } from './core-pwa/core-pwa.module';
import { CoreStorageModule } from './core-storage/core-storage.module';
import { CoreHelperModule } from './core-helper/core-helper.module';

@NgModule({
  declarations: [],
  imports: [
    CorePwaModule,
    CoreHttpModule,
    CoreStorageModule,
    CoreHelperModule
  ]
})
export class CoreModule { }
