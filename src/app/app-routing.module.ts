import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './login/auth-guard.service';

import { LoginComponent } from './login/login/login.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
            {
                path: 'user',
                // canActivate: [AuthGuard],
                // loadChildren: 'app/user/user.module#UserModule'
                 loadChildren: () => UserModule,
            },
            {
                path: 'admin',
                // canActivate: [AuthGuard],
                // loadChildren: 'app/admin/admin.module#AdminModule'
                loadChildren: () => AdminModule,
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
