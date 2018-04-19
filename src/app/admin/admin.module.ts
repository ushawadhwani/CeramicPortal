import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { SpamsComponent } from './spams/spams.component';
import { ReportedabuseComponent } from './reportedabuse/reportedabuse.component';
import { PotentialusersComponent, PotentialUsersDetailDialog } from './potentialusers/potentialusers.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { AdminComponent } from './admin/admin.component';
import { AppMaterialModules } from '../shared/angular-material.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {PotentialusersService} from './potentialusers/potentialusers.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppMaterialModules,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'adminusers',
            component: UserComponent
          },
          {
            path: 'category',
            component: CategoryComponent
          },
          {
            path: 'products',
            component: ProductComponent
          },
          {
            path: 'exhibition',
            component: ExhibitionsComponent
          },
          {
            path: 'potentialusers',
            component: PotentialusersComponent
          },
          {
            path: 'reportabuse',
            component: ReportedabuseComponent
          },
          {
            path: 'spam',
            component: SpamsComponent
          }
        ]
      },
    ])
  ],
  entryComponents: [PotentialusersComponent, PotentialUsersDetailDialog],
  declarations: [SidemenuComponent, DashboardComponent, UserComponent, ProductComponent, CategoryComponent,
    SpamsComponent, ReportedabuseComponent, PotentialusersComponent, PotentialUsersDetailDialog, ExhibitionsComponent, AdminComponent],
    providers: [PotentialusersService]
})
export class AdminModule { }
