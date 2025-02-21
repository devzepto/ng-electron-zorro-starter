import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
  standalone: true,
  imports: [PageHeaderComponent, NzCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Welcome Page',
    breadcrumb: ['welcome'],
    desc: `The back-end solution
    aims to be developed for medium and large projects,providing ready-made
    out-of-the-box solutions and rich examples, without restricting any code for commercial use.`,
  };
  constructor() {}

  ngOnInit(): void {}
}
