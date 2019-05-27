import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { PosComponent } from './components/pos/pos.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'pos',
    component: PosComponent
  },
  { path: '**', redirectTo: 'pos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
