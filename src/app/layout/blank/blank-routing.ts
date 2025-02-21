import { Route } from '@angular/router';

import { EmptyForLockComponent } from '@shared/components/empty-for-lock/empty-for-lock.component';

import { BlankComponent } from './blank.component';

export default [
  {
    path: '',
    component: BlankComponent,
    data: { key: 'blank', shouldDetach: 'no' },
    children: [
      {
        title: '锁屏',
        canDeactivate: [(component: EmptyForLockComponent) => !component.routeStatus.locked],
        data: { key: 'empty-for-lock', shouldDetach: 'no' },
        path: 'empty-for-lock',
        loadComponent: () => import('../../shared/components/empty-for-lock/empty-for-lock.component').then(m => m.EmptyForLockComponent)
      }
    ]
  }
] as Route[];
