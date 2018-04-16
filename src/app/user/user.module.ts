import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AddpostComponent } from './addpost/addpost.component';
import { PostComponent } from './post/post.component';
import { ExhibitionlistComponent } from './exhibitionlist/exhibitionlist.component';
import { ExhibitionComponent } from './exhibition/exhibition.component';
import { UsertopsearchbarComponent } from './usertopsearchbar/usertopsearchbar.component';
import { LikebuttonComponent } from './likebutton/likebutton.component';
import { CommentComponent } from './comment/comment.component';
import { SharebuttonComponent } from './sharebutton/sharebutton.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component:UserComponent
      },
      // {
      //   path: ':addPost',
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
  // ],
  declarations: [NewsfeedComponent, AddpostComponent, PostComponent, ExhibitionlistComponent, 
    ExhibitionComponent, UsertopsearchbarComponent, LikebuttonComponent, 
    CommentComponent, SharebuttonComponent, UserComponent]
})

export class UserModule { }
