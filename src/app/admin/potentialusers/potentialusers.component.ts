import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { PotentialusersService } from './potentialusers.service';

@Component({
  selector: 'app-potentialusers',
  templateUrl: './potentialusers.component.html',
  styleUrls: ['./potentialusers.component.css']
})
export class PotentialusersComponent implements OnInit {

  potentialUsersList: any;

  constructor(public dialog: MatDialog, private potentialusersService: PotentialusersService) { }

  ngOnInit() {
    this.getAllPotentialUsers();
  }
  getAllPotentialUsers() {
    this.potentialusersService.getPotentialUsers().subscribe(
      res => {
        console.log('we got all the potential users');
        console.log(res);
        if (res.status) {
          this.potentialUsersList = res.data;
        }
        else {
          console.log("Error in getting result");
        }

      });
  }

  // potentialuser: {
  fullname: string;
  email: string;
  phoneno: string;
  userid: string;
  // user: {
  //   userid: string,
  //   fullname: string
  // }
  addedtosystem: boolean;
  remarks: string
  // }

  openDialog(): void {
    let dialogRef = this.dialog.open(PotentialUsersDetailDialog, {
      width: '500px',
      height: '500px',
      data: { fullname: this.fullname, email: this.email, phoneno: this.phoneno, userid: this.userid, addedtosysytem: this.addedtosystem, remarks: this.remarks }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed and we got the following data');
      console.log(result);
    });
  }
}

@Component({
  selector: 'potential-user-detail-dialog',
  templateUrl: 'potentialusersdetail.html'
})
export class PotentialUsersDetailDialog {
  useridControl = new FormControl('', [Validators.required]);
  constructor(
    public dialogRef: MatDialogRef<PotentialUsersDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  exhibitionlist: [{ id: 1, fullname: 'Exhibition 1' }, { id: 2, fullname: 'Exhibition 2' }];

  onNoClick(): void {
    this.dialogRef.close();
  }
}
