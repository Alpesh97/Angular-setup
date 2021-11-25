import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';


import { StowageRoutingModule } from './stowage-routing.module';
import { StowageComponent } from './stowage.component';
import { StowageLocationComponent } from './stowage-location/stowage-location.component';
import { SubmitPopupComponent } from './stowage-location/submit-popup/submit-popup.component';
import { StowageCountComponent } from './stowage-location/stowage-count/stowage-count.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [StowageComponent, StowageLocationComponent, SubmitPopupComponent, StowageCountComponent],
  imports: [
    CommonModule,
    StowageRoutingModule,
    SharedModule,
    FormsModule
  ],
  entryComponents: [SubmitPopupComponent, StowageCountComponent]
})
export class StowageModule { }
