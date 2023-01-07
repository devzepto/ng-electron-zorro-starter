import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from '@app/pages/welcome/welcome.component';

const routes: Routes = [{ path: '', component: WelcomeComponent, data: { title: 'Welcome Page', key: 'welcome' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule {}
