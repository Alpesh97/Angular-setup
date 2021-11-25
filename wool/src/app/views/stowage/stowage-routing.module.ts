import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StowageComponent } from './stowage.component';
import { StowageLocationComponent } from './stowage-location/stowage-location.component';



const routes: Routes = [
  { path: '', component: StowageComponent },
  { path: 'location', component: StowageLocationComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StowageRoutingModule { }
