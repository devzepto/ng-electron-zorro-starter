import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginType } from '@app/pages/other-login/login1.component';
import { TranslateModule } from '@ngx-translate/core';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { SpinService } from '@store/common-store/spin.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-normal-login',
  templateUrl: './normal-login.component.html',
  styleUrls: ['./normal-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, NzInputModule, NzButtonModule, NzIconModule, NzCheckboxModule, NzWaveModule, NzDividerModule]
})
export class NormalLoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  typeEnum = LoginType;
  isOverModel = false;
  destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private spinService = inject(SpinService);
  private login1StoreService = inject(Login1StoreService);
  private cdr = inject(ChangeDetectorRef);

  submitForm(): void {
    this.router.navigateByUrl('default/welcome');
  }

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  ngOnInit(): void {
    this.login1StoreService
      .getIsLogin1OverModelStore()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.isOverModel = res;
        this.cdr.markForCheck();
      });
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });
  }
}
