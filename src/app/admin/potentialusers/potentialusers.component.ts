import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { PotentialusersService } from './potentialusers.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Sort } from '@angular/material';
import { DeleteConfirmationDialogComponent } from '../../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-potentialusers',
  templateUrl: './potentialusers.component.html',
  styleUrls: ['./potentialusers.component.css']
})
export class PotentialusersComponent implements OnInit {

  displayedColumns = ['fullname', 'email', 'phonenumber', 'exhibitor', 'remarks', 'addedToSystem', 'actions'];
  potentialuser = {
    userId: {},
    fullName: '',
    email: "",
    remarks: "",
    phoneNumber: "",
    isActive: true,
    isDelete: false,
    addedToSystem: false,
    id: '0'
  };
  dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private potentialusersService: PotentialusersService) {
  }

  ngOnInit() {
    this.getAllPotentialUsers();
  }

  getAllPotentialUsers() {
    this.potentialusersService.getPotentialUsers().subscribe(
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

  getThePotentialuser(potentialuserid: string): void {
    this.potentialusersService.getSinglePotentialUsers(potentialuserid).subscribe(
      res => {
        if (res.status) {
          this.openDialog(res.data);
        }
        else {
          console.log(res.message);
        }
      });
  }

  openDialog(potentialuserdetail): void {
    let dialogRef = this.dialog.open(PotentialUsersDetailDialog, {
      width: '50%',
      height: 'auto',
      data: potentialuserdetail
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed and we got the following data');
      console.log(result);
    });
  }

  openConfirmationDialog(id) {
    this.dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.potentialusersService.deleteParticularPotentialUser(id).subscribe(
          res => {
            if (res.status) {
              this.getAllPotentialUsers();
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
  selector: 'potential-user-detail-dialog',
  templateUrl: 'potentialusersdetail.html',
  styleUrls: ['./potentialusers.component.css']
})
export class PotentialUsersDetailDialog {
  useridControl = new FormControl('', [Validators.required]);
  constructor(
    private potentialusersService: PotentialusersService,
    public dialogRef: MatDialogRef<PotentialUsersDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  exhibitorslist: any;
  ngOnInit() {
    this.getAllExhibitorUsers();
  }
  getAllExhibitorUsers() {
    this.potentialusersService.getExhibitorUsers().subscribe(
      res => {
        if (res.status) {
          this.exhibitorslist = res.data;
        }
        else {
          console.log(res.message);
        }
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  Savethedata(data): void {
    this.potentialusersService.savePotentialUser(this.data).subscribe(
      res => {
        if (res.status) {
          //this.getAllPotentialUsers();
        }
        else {
          //console.log(res.message);
        }
      }
    );
  }
}
