import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarkerComponent } from './marker.component';
import { MarkerDetailsComponent } from './marker-details/marker-details.component';


const routes: Routes = [
  {path:'',component:MarkerComponent},
  {path:'details',component:MarkerDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkerRoutingModule { }
