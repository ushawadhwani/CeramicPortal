import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Sort } from '@angular/material';
import { DeleteConfirmationDialogComponent } from '../../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SizeService } from './size.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})

export class SizeComponent implements OnInit {

  displayedColumns = ['Value', 'Unit', 'actions'];
  size = {
    value: '',
    unit: '',
    id: '0'
  };
  dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private sizeService: SizeService) {
  }

  ngOnInit() {
    this.getAllSizes();
  }

  getAllSizes() {
    this.sizeService.getAllSize().subscribe(
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

  getTheSize(id: string): void {
    this.sizeService.getSingleSize(id).subscribe(
      res => {
        if (res.status) {
          this.openDialog(res.data);
        }
        else {
          console.log(res.message);
        }
      });
  }



  openDialog(size): void {
    let dialogRef = this.dialog.open(SizeDetailDialog, {
      width: '50%',
      height: 'auto',
      data: size
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data == 'cancel') {
        //do nothing
      }
      else if (data == 'save') {
        //refresh the categories
        this.getAllSizes();
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
        this.sizeService.deleteParticularSize(id).subscribe(
          res => {
            if (res.status) {
              this.getAllSizes();
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
  selector: 'size-detail-dialog',
  templateUrl: 'sizedetail.html',
  styleUrls: ['./size.component.css']
})
export class SizeDetailDialog {
  onAdd = new EventEmitter();
  constructor(
    private sizeService: SizeService,
    public dialogRef: MatDialogRef<SizeDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
  }
  onNoClick(calledFrom: string): void {
    this.onAdd.emit(calledFrom);
    this.dialogRef.close();
  }
  Savethedata(data): void {
    this.sizeService.saveSize(data).subscribe(
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