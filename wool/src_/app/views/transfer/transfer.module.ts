import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SharedModule } from 'src/app/shared/shared.module';

import { SubmitPopupComponent } from './transfer-location/submit-popup/submit-popup.component';
import { TransferBalesComponent } from './transfer-location/transfer-bales/transfer-bales.component';
import { TransferLocationComponent } from './transfer-location/transfer-location.component';
import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { TransferService } from 'src/app/services/transfer.service';



@NgModule({
  declarations: [TransferComponent, TransferLocationComponent, SubmitPopupComponent, TransferBalesComponent],
  imports: [
    CommonModule,
    TransferRoutingModule,
    SharedModule,
    FormsModule,
    AutocompleteLibModule,
  ],
  providers: [TransferService],
  entryComponents: [SubmitPopupComponent, TransferBalesComponent]
})
export class TransferModule { }
