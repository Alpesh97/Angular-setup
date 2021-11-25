import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalecaptureService } from 'src/app/services/balecapture.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { BalecaptureRoutingModule } from './balecapture-routing.module';
import { BalecaptureComponent } from './balecapture.component';
import { BalecaptureStreetComponent } from './balecapture-street/balecapture-street.component';
import { SuccessPopupComponent } from './balecapture-street/success-popup/success-popup.component';


@NgModule({
  declarations: [BalecaptureComponent, BalecaptureStreetComponent, SuccessPopupComponent],
  imports: [
    CommonModule,
    BalecaptureRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [BalecaptureService],
  entryComponents: [SuccessPopupComponent]
})
export class BalecaptureModule { }
