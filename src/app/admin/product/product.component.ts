import { Component, OnInit, ViewChild, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Sort } from '@angular/material';
import { DeleteConfirmationDialogComponent } from '../../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ProductService } from './product.service';
import { CategoryService } from 'app/admin/category/category.service';
import { SizeService } from 'app/admin/size/size.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  displayedColumns = ['Name', 'Product Owner', 'Category', 'Unit', 'Description', 'actions'];
  product = {
    userId: {},
    categoryId:{},
    sizeId:{},
    name: '',
    description: "",
    id: '0'
  };
  dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProduct().subscribe(
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

  getTheProduct(id: string): void {
    this.productService.getSingleProduct(id).subscribe(
      res => {
        if (res.status) {
          this.openDialog(res.data);
        }
        else {
          console.log(res.message);
        }
      });
  }



  openDialog(product): void {
    let dialogRef = this.dialog.open(ProductDetailDialog, {
      width: '50%',
      height: 'auto',
      data: product
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data == 'cancel') {
        //do nothing
      }
      else if (data == 'save') {
        //refresh the categories
        this.getAllProducts();
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
        this.productService.deleteParticularProduct(id).subscribe(
          res => {
            if (res.status) {
              this.getAllProducts();
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
  selector: 'product-detail-dialog',
  templateUrl: 'productdetail.html',
  styleUrls: ['./product.component.css']
})
export class ProductDetailDialog {
  onAdd = new EventEmitter();
  userlist: any;
  catList: any;
  sizeList: any;
  catIdControl = new FormControl('', [Validators.required]);
  sizeIdControl = new FormControl('', [Validators.required]);
  userIdControl = new FormControl('', [Validators.required]);
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private sizeService: SizeService,
    public dialogRef: MatDialogRef<ProductDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.getAllCategory();
    this.getAllSizes();
  }

  // getAllManufacturerUsers() {
  //   this.productService.getAllTheManufacturer().subscribe(
  //     res => {
  //       if (res.status) {
  //         this.userlist = res.data;
  //       }
  //       else {
  //         console.log(res.message);
  //       }
  //     });
  // }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(
      res => {
        if (res.status) {
          this.catList = res.data;
          console.log('category list');
          console.log(this.catList);
        }
        else {
          console.log(res.message);
        }
      });
  }

  getAllSizes() {
    this.sizeService.getAllSize().subscribe(
      res => {
        if (res.status) {
          this.sizeList = res.data;
        }
        else {
          console.log(res.message);
        }
      });
  }

  onNoClick(calledFrom: string): void {
    this.onAdd.emit(calledFrom);
    this.dialogRef.close();
  }
  Savethedata(data): void {
    this.productService.saveProduct(data).subscribe(
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
