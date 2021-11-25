import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalecaptureComponent } from './balecapture.component';
import { BalecaptureStreetComponent } from './balecapture-street/balecapture-street.component';


const routes: Routes = [
  { path: '', component: BalecaptureComponent},
  { path: 'balecapture-street', component: BalecaptureStreetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalecaptureRoutingModule { }
