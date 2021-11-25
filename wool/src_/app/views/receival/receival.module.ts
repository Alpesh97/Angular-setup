import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SharedModule } from 'src/app/shared/shared.module';

import { AddBagComponent } from './add-receival/add-bag/add-bag.component';
import { AddReceivalComponent } from './add-receival/add-receival.component';
import { SubmitPopupComponent } from './add-receival/submit-popup/submit-popup.component';
import { ReceivalRoutingModule } from './receival-routing.module';
import { ReceivalService } from 'src/app/services/receival.service';
import { UnknownBrandComponent } from './add-receival/unknown-brand/unknown-brand.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutocompleteLibModule,
    ReceivalRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AddReceivalComponent, SubmitPopupComponent, AddBagComponent, UnknownBrandComponent],
  entryComponents: [AddReceivalComponent, SubmitPopupComponent, AddBagComponent],
  providers: [ReceivalService]
})
export class ReceivalModule { }
