import { inject, Inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { MENU_TOKEN } from '@app/config/menu';
import { Menu } from '@core/services/types';
import { BaseHttpService } from '@services/base-http.service';
import { MenusService } from '@services/system/menus.service';


export interface UserLogin {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(BaseHttpService);
  menus = inject(MENU_TOKEN);

  public login(params: UserLogin): Observable<string> {
       //模拟返回token
       return of('token');
       // 下面的注释为演示调用接口
    // return this.http.post('/login', params, { needSuccessInfo: false });
  }

  public getMenuByUserId(userId: number): Observable<Menu[]> {
    // 如果是静态菜单，就把下面注释放开
    return of(this.menus).pipe(delay(1));
    // return this.http.get(`/sysPermission/menu/${userId}`);
  }
}
