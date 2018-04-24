import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LogoutComponent, DeleteConfirmationDialogComponent]
})
export class SharedModule { }
