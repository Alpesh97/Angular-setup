import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';


import { MarkerRoutingModule } from './marker-routing.module';
import { MarkerComponent } from './marker.component';
import { MarkerDetailsComponent } from './marker-details/marker-details.component';
import { FormsModule } from '@angular/forms';
import { MarkerService } from 'src/app/services/marker.service';


@NgModule({
  declarations: [MarkerComponent, MarkerDetailsComponent],
  imports: [
    CommonModule,
    MarkerRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [MarkerService]
})
export class MarkerModule { }
