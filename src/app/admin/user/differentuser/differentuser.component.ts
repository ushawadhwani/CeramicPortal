import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-differentuser',
  templateUrl: './differentuser.component.html',
  styleUrls: ['./differentuser.component.css']
})
export class DifferentuserComponent implements OnInit {
  @Input() componentname: string;
  @Input() datasource: any;
  constructor() { }

  ngOnInit() {
  }

}
