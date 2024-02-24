import { Component, OnInit } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { TableComponent } from '../../../components/table/table.component';
import { DialogComponent } from '../../../components/dialog/dialog.component';



import { ProductService } from '../../../services/product_service/product.service';
import { InitService } from '../../../services/init_service/init.service';

import { Product } from '../../../models/product';
import { Toast } from '../../../global/toast.global';
import { BehaviorSubject } from 'rxjs';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatDialogModule, TableComponent],
  providers: [DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  public products:Array<Product> = []; 
  products$ = new BehaviorSubject<Product[]>([]);
  
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
  }
}
