import { Route } from '@angular/router';

import { JudgeAuthGuard } from '@core/services/common/guard/judgeAuth.guard';
import { JudgeLoginGuard } from '@core/services/common/guard/judgeLogin.guard';

import { DefaultComponent } from './default.component';

export default [
  {
    path: '',
    component: DefaultComponent,
    data: { shouldDetach: 'no', preload: true },
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      {
        path: 'welcome',
        title: 'Welcome Page',
        data: { key: 'welcome', preload: true },
        loadComponent: () => import('../../pages/welcome/welcome.component').then(m => m.WelcomeComponent)
      }
    ]
  }
] as Route[];
