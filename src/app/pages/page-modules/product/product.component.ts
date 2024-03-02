import { Component, OnInit } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TableComponent } from '../../../components/table/table.component';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { SearchBarComponent } from '../../../components/search-bar/search-bar.component';


import { ProductService } from '../../../services/product_service/product.service';
import { InitService } from '../../../services/init_service/init.service';

import { Product } from '../../../models/product';
import { Toast } from '../../../global/toast.global';
import { BehaviorSubject } from 'rxjs';

import { DatePipe } from '@angular/common';
import { search_bar } from '../../../types/search-bar';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatDialogModule, TableComponent, SearchBarComponent, FontAwesomeModule],
  providers: [DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  public products:Array<Product> = []; 
  public productsList: Array<Product> = [];
  products$ = new BehaviorSubject<Product[]>([]);

  public filters = ['id', 'nombre', 'categoría'];
  public searchActive:boolean = false;
  
 

  constructor(
    private _productService:ProductService,
    private _initService: InitService,
    private _dialog: MatDialog,
    public datePipe: DatePipe) { }

  ngOnInit(): void {     
    this._initService.products$.subscribe(products => {           
        this.products = products;   
        this.products$.next(products);      
    });   
    
  }

  onAddProduct() {
    const dialogRef = this._dialog.open(
      DialogComponent, {
      width: '30%',
      minWidth: '20rem',
      minHeight: '500px',
      data: { form: 'addProduct', dataObject: {} }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {        
        this._productService.create(res).subscribe({
          next: res => {
            this.products.push(res);
            this._initService.updateProductsList(this.products);

            Toast.fire({
              icon: 'success',
              title: 'Producto añadido'
            });
          },
          error: e => {console.log(e)}
        });
      }
    })
  };


  onSelected(event:any) {
    let dialogRef;
    let item = event.item;

    switch (event.operation) {
      case 'update' : 
      dialogRef = this._dialog.open(
        DialogComponent, {
        width: '30%',
        minWidth: '20rem',
        minHeight: '500px',
        data: { form: 'updProduct', dataObject: item }
      });
      dialogRef.afterClosed().subscribe(res => {
        if(res !== undefined) {
          this._productService.update(item._id, res).subscribe({
            next: res => {
              this._initService.updateProductsList(res);
              
              Toast.fire({
                icon: 'success',
                title: 'Producto actualizado'
              });
            }
          });
        }
      });

      break;

      case 'delete':
        dialogRef = this._dialog.open(
          DialogComponent, {
          width: '30%',
          minWidth: '20rem',
          minHeight: '500px',
          data: { form: 'confirmation', dataObject: item }
        });
        dialogRef.afterClosed().subscribe(res => {
          if (res === 'accept') { 
            this._productService.delete(item._id).subscribe({
              next: res => {
                this.products = this.products.filter(e => e._id != res._id);
                this._initService.updateProductsList(this.products);
              },
              error: e => {console.log(e)}
            });
          }
        });
      break;
    }
  }

  onSearch(searchData: search_bar) { 
    this.searchActive = true;   
    this._productService.findByFilter(searchData.selectedFilter, searchData.content).subscribe({
      next: res => {        
        if(res.status === 409 ) {
          Toast.fire({
            icon: 'error',
            text: res.response.error
          });
        } else {
          this.productsList = this.products;          
          this._initService.updateProductsList(res);
        }
      },
      error: e => {console.log(e)}
    });
  }

  onEndSearch() {
    this._initService.updateProductsList(this.productsList);
    this.searchActive = false;
  }
}
