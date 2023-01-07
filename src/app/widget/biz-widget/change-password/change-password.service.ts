import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ChangePasswordComponent } from '@widget/biz-widget/change-password/change-password.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';

import { ModalWrapService } from '../../base-modal';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  constructor(private modalWrapService: ModalWrapService) {}

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }

  protected getContentComponent(): NzSafeAny {
    return ChangePasswordComponent;
  }
}
