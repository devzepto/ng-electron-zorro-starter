import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
