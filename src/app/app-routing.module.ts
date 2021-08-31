import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './ui/account/account.component';
import { PoolComponent } from './ui/pool/pool.component';

const routes: Routes = [
  { path: "", redirectTo: "pool", pathMatch: "full" },
  { path: "account", component: AccountComponent },
  { path: "pool", component: PoolComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
