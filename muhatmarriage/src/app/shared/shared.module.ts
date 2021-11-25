import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatchHeightDirective } from 'src/app/match-height.directive';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MatchHeightDirective
  ],
  imports: [
    RouterModule,
    CommonModule,
    AngularMaterialModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    AngularMaterialModule,
    MatchHeightDirective,
    NgxMatSelectSearchModule
  ]
})
export class SharedModule { }