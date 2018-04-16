import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './login/auth-guard.service';
// import { SelectiveStrategy } from './selective-strategy.service';

import { LoginComponent } from './login/login/login.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'login', component: LoginComponent },
            {
                path: 'user',
                canActivate: [AuthGuard],
                loadChildren: 'app/user/user.module#UserModule'
            },
            {
                path: 'admin',
                canActivate: [AuthGuard],
                loadChildren: 'app/admin/admin.module#AdminModule'
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ])
        // , { preloadingStrategy: SelectiveStrategy }) // , { enableTracing: true })
    ],
    // providers: [ SelectiveStrategy ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
