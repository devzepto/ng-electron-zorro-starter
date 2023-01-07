import { DOCUMENT, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { ScrollService } from '@core/services/common/scroll.service';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { SimpleReuseStrategy } from './services/common/reuse-strategy';

registerLocaleData(en);

@NgModule({
  providers: [
    { provide: RouteReuseStrategy, useClass: SimpleReuseStrategy, deps: [DOCUMENT, ScrollService] },
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
