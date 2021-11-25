import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferComponent } from './transfer.component';
import { TransferLocationComponent } from './transfer-location/transfer-location.component';



const routes: Routes = [
  { path: '', component: TransferComponent },
  { path: 'location', component: TransferLocationComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
