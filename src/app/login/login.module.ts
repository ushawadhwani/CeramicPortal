import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { AppMaterialModules } from '../shared/angular-material.module';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModules,
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ])

  ],
  declarations: [LoginComponent, SignupComponent],
  providers: [
    AuthService,
    LoginService,
    AuthGuard
  ]
})
export class LoginModule { }
