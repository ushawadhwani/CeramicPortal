import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ProductComponent, ProductDetailDialog } from './product/product.component';
import { CategoryComponent, CategoryDetailDialog } from './category/category.component';
import { SizeComponent, SizeDetailDialog } from './size/size.component';
import { SpamsComponent } from './spams/spams.component';
import { ReportedabuseComponent } from './reportedabuse/reportedabuse.component';
import { PotentialusersComponent, PotentialUsersDetailDialog } from './potentialusers/potentialusers.component';
import { ExhibitionsComponent, ExhibitionDetailDialog } from './exhibitions/exhibitions.component';
import { AdminComponent } from './admin/admin.component';
import { AppMaterialModules } from '../shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmationDialogComponent } from '../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';

import { ProductService } from './product/product.service';
import { PotentialusersService } from './potentialusers/potentialusers.service';
import { CategoryService } from './category/category.service';
import { SizeService } from './size/size.service';
import { ExhibitionService } from './exhibitions/exhibition.service';
import { UserService } from './user/user.service';
import { UserdetaildialogComponent } from './user/userdetaildialog/userdetaildialog.component';
import { DifferentuserComponent } from './user/differentuser/differentuser.component';

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
            path: 'size',
            component: SizeComponent
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
<<<<<<< HEAD
  entryComponents: [PotentialUsersDetailDialog, DeleteConfirmationDialogComponent, CategoryDetailDialog, SizeDetailDialog,
    ProductDetailDialog, ExhibitionDetailDialog, UserdetaildialogComponent],
  declarations: [SidemenuComponent, DashboardComponent, UserComponent, ProductComponent, ProductDetailDialog, CategoryComponent,
    CategoryDetailDialog, SizeComponent, SizeDetailDialog, SpamsComponent, ReportedabuseComponent, PotentialusersComponent,
    PotentialUsersDetailDialog, DeleteConfirmationDialogComponent, ExhibitionsComponent, ExhibitionDetailDialog, AdminComponent,
    UserdetaildialogComponent,
    DifferentuserComponent],
  providers: [PotentialusersService, CategoryService, SizeService, ProductService, ExhibitionService, UserService]
=======
  entryComponents: [PotentialusersComponent, PotentialUsersDetailDialog],
  declarations: [SidemenuComponent, DashboardComponent, UserComponent, ProductComponent, CategoryComponent,
    SpamsComponent, ReportedabuseComponent, PotentialusersComponent, PotentialUsersDetailDialog, ExhibitionsComponent, AdminComponent],
    providers: [PotentialusersService]
>>>>>>> e6ae83d9a33d96d5e58703908e7e954d63426313
})
export class AdminModule { }
