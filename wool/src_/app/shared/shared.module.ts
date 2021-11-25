import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    AngularMaterialModule,
    RouterModule,
    CommonModule,
    InfiniteScrollModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    AngularMaterialModule,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    InfiniteScrollModule
  ]
})
export class SharedModule { }
