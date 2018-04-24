import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Sort } from '@angular/material';
import { DeleteConfirmationDialogComponent } from '../../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ExhibitionService } from './exhibition.service';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.css']
})

export class ExhibitionsComponent implements OnInit {

  displayedColumns = ['Name','Venue','Start date','End date','Description', 'actions'];
 
  dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private exhibitionService: ExhibitionService) {
  }

  ngOnInit() {
    this.getAllExhibitions();
  }

  getAllExhibitions() {
    this.exhibitionService.getAllExhibition().subscribe(
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

  getTheExhibition(id: string): void {
    this.exhibitionService.getSingleExhibition(id).subscribe(
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
    let dialogRef = this.dialog.open(ExhibitionDetailDialog, {
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
        this.getAllExhibitions();
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
        this.exhibitionService.deleteParticularExhibition(id).subscribe(
          res => {
            if (res.status) {
              this.getAllExhibitions();
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
  selector: 'exhibition-detail-dialog',
  templateUrl: 'exhibitiondetail.html',
  styleUrls: ['./exhibitions.component.css']
})
export class ExhibitionDetailDialog {
  onAdd = new EventEmitter();
  constructor(
    private exhibitionService: ExhibitionService,
    public dialogRef: MatDialogRef<ExhibitionDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
  }
  onNoClick(calledFrom: string): void {
    this.onAdd.emit(calledFrom);
    this.dialogRef.close();
  }
  Savethedata(data): void {
    this.exhibitionService.saveExhibition(data).subscribe(
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
