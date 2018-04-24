import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }
  roleList: any;
  datasource:any;
  ngOnInit() {
    this.getAllRole();
  }

  getAllRole(){
    this.userService.getAllRoles().subscribe(
      res => {
        if (res.status) {
          this.roleList = res.data;
         // console.log(res);
        }
        else {
          console.log(res.message);
        }
      });;
  }

  

}
