import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { LockWidgetComponent } from './lock-widget.component';

@NgModule({
  declarations: [LockWidgetComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SHARED_ZORRO_MODULES, TranslateModule]
})
export class LockWidgetModule {}
