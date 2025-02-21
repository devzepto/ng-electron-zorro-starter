import { CdkDrag } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { IsNightKey, ThemeOptionsKey } from '@config/constant';
import { SimpleReuseStrategy } from '@core/services/common/reuse-strategy';
import { TabService } from '@core/services/common/tab.service';
import { ThemeSkinService } from '@core/services/common/theme-skin.service';
import { WindowService } from '@core/services/common/window.service';
import { SettingInterface, ThemeService } from '@store/common-store/theme.service';
import { fnFormatToHump } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '@env/environment';

interface NormalModel {
  image?: string;
  title: string;
  isChecked: boolean;
}

export interface Theme extends NormalModel {
  key: 'dark' | 'light';
}

type SpecialTheme = 'color-weak' | 'grey-theme';
type SpecialThemeHump = 'colorWeak' | 'greyTheme';

interface Color extends NormalModel {
  key: string;
  color: string;
}

export interface ThemeMode extends NormalModel {
  key: 'side' | 'top' | 'mixin';
}

@Component({
  selector: 'app-setting-drawer',
  templateUrl: './setting-drawer.component.html',
  styleUrls: ['./setting-drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, CdkDrag, NzIconModule, NzButtonModule, NzDrawerModule, NzToolTipModule, NzDividerModule, NzListModule, NzSwitchModule, FormsModule]
})
export class SettingDrawerComponent implements OnInit {
  private themesService = inject(ThemeService);
  private tabService = inject(TabService);
  private activatedRoute = inject(ActivatedRoute);
  private doc = inject(DOCUMENT);
  private nzConfigService = inject(NzConfigService);
  private themeSkinService = inject(ThemeSkinService);
  private windowServe = inject(WindowService);
  private rd2 = inject(Renderer2);

  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  _isNightTheme = false;
  _themesOptions: SettingInterface = {
    theme: 'dark',
    color: '#1890FF',
    mode: 'side',
    fixedTab: false,
    isShowTab: true,
    splitNav: true,
    greyTheme: false,
    colorWeak: false,
    fixedLeftNav: true,
    fixedHead: true,
    hasTopArea: true,
    hasFooterArea: true,
    hasNavArea: true,
    hasNavHeadArea: true
  };
  isCollapsed = false;
  dragging = false;

  themes: Theme[] = [
    {
      key: 'dark',
      image: environment.production ? 'assets/imgs/theme-dark.svg' : '/assets/imgs/theme-dark.svg',
      title: '暗色菜单风格',
      isChecked: true
    },
    {
      key: 'light',
      image: environment.production ? 'assets/imgs/theme-light.svg' : '/assets/imgs/theme-light.svg',
      title: '亮色菜单风格',
      isChecked: false
    }
  ];
  colors: Color[] = [
    {
      key: 'dust',
      color: '#F5222D',
      title: '薄暮',
      isChecked: false
    },
    {
      key: 'volcano',
      color: '#FA541C',
      title: '火山',
      isChecked: false
    },
    {
      key: 'sunset',
      color: '#FAAD14',
      title: '日暮',
      isChecked: false
    },
    {
      key: 'cyan',
      color: '#13C2C2',
      title: '明青',
      isChecked: false
    },
    {
      key: 'green',
      color: '#52C41A',
      title: '极光绿',
      isChecked: false
    },
    {
      key: 'daybreak',
      color: '#1890FF',
      title: '拂晓蓝（默认）',
      isChecked: true
    },
    {
      key: 'geekblue',
      color: '#2F54EB',
      title: '极客蓝',
      isChecked: false
    },
    {
      key: 'purple',
      color: '#722ED1',
      title: '酱紫',
      isChecked: false
    }
  ];
  modes: ThemeMode[] = [
    {
      key: 'side',
      image: environment.production ? 'assets/imgs/menu-side.svg' : '/assets/imgs/menu-side.svg',
      title: 'COMPONENTS.SETTING_DRAWER.SIDE_MENU_LAYOUT',
      isChecked: true
    },
    {
      key: 'top',
      image: environment.production ? 'assets/imgs/menu-top.svg' : '/assets/imgs/menu-top.svg',
      title: 'COMPONENTS.SETTING_DRAWER.TOP_MENU_LAYOUT',
      isChecked: false
    },
    {
      key: 'mixin',
      image: environment.production ? 'assets/imgs/menu-top.svg' : '/assets/imgs/menu-top.svg',
      title: 'COMPONENTS.SETTING_DRAWER.HYBRID_MENU_LAYOUT',
      isChecked: false
    }
  ];

  changeCollapsed(): void {
    if (!this.dragging) {
      this.isCollapsed = !this.isCollapsed;
    } else {
      this.dragging = false;
    }
  }

  changePrimaryColor(color: Color): void {
    this.selOne(color as NormalModel, this.colors);
    this.nzConfigService.set('theme', { primaryColor: color.color });
    this._themesOptions.color = color.color;
    this.setThemeOptions();
  }

  // 修改黑夜主题
  changeNightTheme(isNight: boolean): void {
    this.windowServe.setStorage(IsNightKey, `${isNight}`);
    this.themesService.setIsNightTheme(isNight);
    this.themeSkinService.toggleTheme().then();
  }

  // 选择一个isChecked为true,其他为false
  selOne(item: NormalModel, itemArray: NormalModel[]): void {
    itemArray.forEach(_item => (_item.isChecked = false));
    item.isChecked = true;
  }

  changeMode(mode: ThemeMode): void {
    this.selOne(mode, this.modes);
    this.themesService.setIsCollapsed(false);
    this._themesOptions.mode = mode.key;
    this.setThemeOptions();
  }

  // 切换主题
  changeTheme(themeItem: Theme): void {
    this.selOne(themeItem, this.themes);
    this._themesOptions.theme = themeItem.key;
    this.setThemeOptions();
  }

  // 设置主题参数
  setThemeOptions(): void {
    this.themesService.setThemesMode(this._themesOptions);
    this.windowServe.setStorage(ThemeOptionsKey, JSON.stringify(this._themesOptions));
  }

  // 修改固定头部
  changeFixed(isTrue: boolean, type: 'isShowTab' | 'splitNav' | 'fixedTab' | 'fixedLeftNav' | 'fixedHead' | 'hasTopArea' | 'hasFooterArea' | 'hasNavArea' | 'hasNavHeadArea'): void {
    // 非固定头部时，设置标签也不固定
    if (type === 'fixedHead' && !isTrue) {
      this._themesOptions['fixedTab'] = false;
    }
    this._themesOptions[type] = isTrue;
    this.setThemeOptions();

    // 如果不展示多标签，则要清空tab,以及已经被缓存的所有组件
    if (type === 'isShowTab') {
      if (!isTrue) {
        SimpleReuseStrategy.deleteAllRouteSnapshot(this.activatedRoute.snapshot).then(() => {
          this.tabService.clearTabs();
        });
      } else {
        this.tabService.refresh();
      }
    }
  }

  // 修改特殊主题，色弱主题，灰色主题
  changeSpecialTheme(e: boolean, themeType: SpecialTheme): void {
    const name = this.doc.getElementsByTagName('html');
    const theme = fnFormatToHump(themeType);
    if (e) {
      this.rd2.addClass(name[0], themeType);
    } else {
      this.rd2.removeClass(name[0], themeType);
    }
    this._themesOptions[theme as SpecialThemeHump] = e;
    this.setThemeOptions();
  }

  initThemeOption(): void {
    this.isNightTheme$.pipe(first()).subscribe(res => (this._isNightTheme = res));
    this.themesOptions$.pipe(first()).subscribe(res => {
      this._themesOptions = res;
    });

    // 特殊模式主题变换（色弱模式，灰色模式）
    (['grey-theme', 'color-weak'] as SpecialTheme[]).forEach(item => {
      const specialTheme = fnFormatToHump(item);
      this.changeSpecialTheme(this._themesOptions[specialTheme as SpecialThemeHump], item);
    });

    this.modes.forEach(item => {
      item.isChecked = item.key === this._themesOptions.mode;
    });
    this.colors.forEach(item => {
      item.isChecked = item.color === this._themesOptions.color;
    });
    this.changePrimaryColor(this.colors.find(item => item.isChecked)!);
    this.themes.forEach(item => {
      item.isChecked = item.key === this._themesOptions.theme;
    });
  }

  ngOnInit(): void {
    this.initThemeOption();
  }

  dragEnd(): void {
    if (this.dragging) {
      setTimeout(() => {
        this.dragging = false;
      });
    }
  }
}
