import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivalService } from 'src/app/services/receival.service';

import { AddReceivalComponent } from './add-receival/add-receival.component';

const routes: Routes = [
  { path: '**', component: AddReceivalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ReceivalService]
})
export class ReceivalRoutingModule { }
