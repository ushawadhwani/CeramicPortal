import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList: string[];
  constructor() { }
  showInfo(): void {

  }
  ngOnInit(): void {
    this.categoryList = ['Tiles', 'Basin', 'Tile2']
  }

}
