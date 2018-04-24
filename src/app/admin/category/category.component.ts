import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Sort } from '@angular/material';
import { DeleteConfirmationDialogComponent } from '../../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  displayedColumns = ['Name', 'actions'];
  category = {
    name: '',
    id: '0'
  };
  dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(
      res => {
        if (res.status) {
          this.dataSource = new MatTableDataSource<Element>(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          console.log(res.message);
        }
      });
  }

  getTheCategory(id: string): void {
    this.categoryService.getSingleCategory(id).subscribe(
      res => {
        if (res.status) {
          this.openDialog(res.data);
        }
        else {
          console.log(res.message);
        }
      });
  }



  openDialog(category): void {
    let dialogRef = this.dialog.open(CategoryDetailDialog, {
      width: '50%',
      height: 'auto',
      data: category
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data == 'cancel') {
        //do nothing
      }
      else if (data == 'save') {
        //refresh the categories
        this.getAllCategories();
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      // console.log('dialog closed');
      // console.log(result);
      //do nothing
    });
  }

  openConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteParticularCategory(id).subscribe(
          res => {
            if (res.status) {
              this.getAllCategories();
            }
            else {
              console.log(res.message);
            }
          }
        );
      }
      this.dialogRef = null;
    });
  }

}

@Component({
  selector: 'category-detail-dialog',
  templateUrl: 'categorydetail.html',
  styleUrls: ['./category.component.css']
})
export class CategoryDetailDialog {
  onAdd = new EventEmitter();
  constructor(
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
  }
  onNoClick(calledFrom: string): void {
    this.onAdd.emit(calledFrom);
    this.dialogRef.close();
  }
  Savethedata(data): void {
    this.categoryService.saveCategory(data).subscribe(
      res => {
        if (res.status) {
          //need to refresh the list
          this.onNoClick('save');
        }
        else {
          //console.log(res.message);
          this.onNoClick('cancel');
        }
      }
    );
  }


}
