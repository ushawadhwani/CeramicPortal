import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-differentuser',
  templateUrl: './differentuser.component.html',
  styleUrls: ['./differentuser.component.css']
})
export class DifferentuserComponent implements OnInit {
  @Input() componentname: string;

  constructor(private userService: UserService) { }
  displayedColumns = ['Name', 'Email', 'UserType', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.getUserByRole(this.componentname);
  }

  getUserByRole(rolename) {
    this.userService.getAllUserByRole(rolename).subscribe(
      res => {
        if (res.status) {
          console.log('users as per role', res.data);
          //this.dataSource = res.data;
          this.dataSource = new MatTableDataSource<Element>(res.data);
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;
          console.log(res);
        }
        else {
          console.log(res.message);
        }
      });;

  }
}
