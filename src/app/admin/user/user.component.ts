import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getUserByRole(role) {
    this.userService.getAllUserByRole(role).subscribe(
      res => {
        if (res.status) {
          // this.dataSource = new MatTableDataSource<Element>(res.data);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          console.log(res);
        }
        else {
          console.log(res.message);
        }
      });;

  }

}
