import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@core/core.module';
import { InitThemeService } from '@core/services/common/init-theme.service';
import { LoadAliIconCdnService } from '@core/services/common/load-ali-icon-cdn.service';
import { SubLockedStatusService } from '@core/services/common/sub-locked-status.service';
import { SubWindowWithService } from '@core/services/common/sub-window-with.service';
import { ThemeSkinService } from '@core/services/common/theme-skin.service';
import { StartupService } from '@core/startup/startup.service';
import { SharedModule } from '@shared/shared.module';
import { LoginModalModule } from '@widget/biz-widget/login/login-modal.module';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import interceptors from './core/services/interceptors';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { environment } from '@env/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function LoadAliIconCdnFactory(
  loadAliIconCdnService: LoadAliIconCdnService
) {
  return () => loadAliIconCdnService.load();
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function InitThemeServiceFactory(initThemeService: InitThemeService) {
  return async () => await initThemeService.initTheme();
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function InitLockedStatusServiceFactory(
  subLockedStatusService: SubLockedStatusService
) {
  return () => subLockedStatusService.initLockedStatus();
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SubWindowWithServiceFactory(
  subWindowWithService: SubWindowWithService
) {
  return () => subWindowWithService.subWindowWidth();
}

// 初始化服务
const APPINIT_PROVIDES = [
  // 项目启动
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
  // load阿里图标库cdn
  {
    provide: APP_INITIALIZER,
    useFactory: LoadAliIconCdnFactory,
    deps: [LoadAliIconCdnService],
    multi: true,
  },
  // 初始化锁屏服务
  {
    provide: APP_INITIALIZER,
    useFactory: InitLockedStatusServiceFactory,
    deps: [SubLockedStatusService],
    multi: true,
  },
  // 初始化主题
  {
    provide: APP_INITIALIZER,
    useFactory: InitThemeServiceFactory,
    deps: [InitThemeService],
    multi: true,
  },
  // 初始化监听屏幕宽度服务
  {
    provide: APP_INITIALIZER,
    useFactory: SubWindowWithServiceFactory,
    deps: [SubWindowWithService],
    multi: true,
  },
  // 初始化暗黑模式还是default模式的css
  {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeSkinService) => () => themeService.loadTheme(),
    deps: [ThemeSkinService],
    multi: true,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    LoginModalModule,
    PasswordStrengthMeterModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.i18n,
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
    }
    })
  ],
  providers: [...interceptors, ...APPINIT_PROVIDES],
  bootstrap: [AppComponent],
})
export class AppModule {}
