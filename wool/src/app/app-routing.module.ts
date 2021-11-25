import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'receival', loadChildren: () => import('./views/receival/receival.module').then(m => m.ReceivalModule) },
  { path: 'stowage', loadChildren: () => import('./views/stowage/stowage.module').then(m => m.StowageModule) },
  { path: 'balecapture', loadChildren: () => import('./views/balecapture/balecapture.module').then(m => m.BalecaptureModule) },
  { path: 'transfer', loadChildren: () => import('./views/transfer/transfer.module').then(m => m.TransferModule) },
  { path: 'marker', loadChildren: () => import('./views/marker/marker.module').then(m => m.MarkerModule) },
  { path: '**', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
