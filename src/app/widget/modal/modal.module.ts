import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { NzModalModule } from 'ng-zorro-antd/modal';

import { ModalDragDirective } from './modal-drag.directive';
import { ModalDragService } from './modal-drag.service';
import { NzModalWrapService } from './nz-modal-wrap.service';

@NgModule({
  declarations: [ModalDragDirective],
  imports: [NzModalModule, TranslateModule],
  exports: [ModalDragDirective],
  providers: [NzModalWrapService, ModalDragService]
})
export class NzxModalModule {}
