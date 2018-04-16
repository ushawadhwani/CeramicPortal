import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { SpamsComponent } from './spams/spams.component';
import { ReportedabuseComponent } from './reportedabuse/reportedabuse.component';
import { PotentialusersComponent } from './potentialusers/potentialusers.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
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

      // {
      //   path: ':id',
      //   component: AddpostComponent,
      //   resolve: { product: ProductResolver }
      // },
      // {
      //   path: ':id/edit',
      //   component: ProductEditComponent,
      //   resolve: { product: ProductResolver },
      //   canDeactivate: [ProductEditGuard],
      //   children: [
      //     {
      //       path: '',
      //       redirectTo: 'info',
      //       pathMatch: 'full'
      //     },
      //     {
      //       path: 'info',
      //       component: ProductEditInfoComponent
      //     },
      //     {
      //       path: 'tags',
      //       component: ProductEditTagsComponent
      //     }
      //   ]
      // }
    ])
  ],
  declarations: [SidemenuComponent, DashboardComponent, UserComponent, ProductComponent, CategoryComponent, SpamsComponent, ReportedabuseComponent, PotentialusersComponent, ExhibitionsComponent, AdminComponent]
})
export class AdminModule { }
