import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";


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

import { TDocumentDefinitions } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { PdfService } from '../../../services/pdf_service/pdf.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatDialogModule, TableComponent, SearchBarComponent, FontAwesomeModule],
  providers: [DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  public products: Array<Product> = [];
  public productsList: Array<Product> = [];
  products$ = new BehaviorSubject<Product[]>([]);

  public filters = ['id', 'nombre', 'categoría'];
  public searchActive: boolean = false;



  constructor(
    private _productService: ProductService,
    private _initService: InitService,
    private _dialog: MatDialog,
    public datePipe: DatePipe,
    public _pdfService: PdfService) { }

  ngOnInit(): void {
    this._initService.products$.subscribe(products => {
      this.products = products;
      this.products = this.products.sort((a, b): number => {
        const categoria_primer_producto = a.category.toUpperCase();
        const categoria_segundo_producto = b.category.toUpperCase();

        if (categoria_primer_producto < categoria_segundo_producto) {
          return -1;
        } else if (categoria_primer_producto > categoria_segundo_producto) {
          return 1;
        } else {
          if (a.price > b.price) {
            return 1;
          } else if (a.price < b.price) {
            return -1;
          } else {
            return 0;
          }
        }

      })
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
          error: e => { console.log(e) }
        });
      }
    })
  };


  onSelected(event: any) {
    let dialogRef;
    let item = event.item;

    switch (event.operation) {
      case 'update':
        dialogRef = this._dialog.open(
          DialogComponent, {
          width: '30%',
          minWidth: '20rem',
          minHeight: '500px',
          data: { form: 'updProduct', dataObject: item }
        });
        dialogRef.afterClosed().subscribe(res => {
          if (res !== undefined) {
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
              error: e => { console.log(e) }
            });
          }
        });
        break;
    }
  }

  onSearch(searchData: search_bar) {

    this._productService.findByFilter(searchData.selectedFilter, searchData.content).subscribe({
      next: res => {
        if (res.status === 409) {
          Toast.fire({
            icon: 'error',
            text: res.response.error
          });
        } else {
          this.searchActive = true;
          this.productsList = this.products;
          this._initService.updateProductsList(res);
        }
      },
      error: e => { console.log(e) }
    });
  }

  onEndSearch() {
    this._initService.updateProductsList(this.productsList);
    this.searchActive = false;
  }

  onCreateInventory() {
    let header = `Inventario de productos generado en la fecha ${new Date().toDateString()}`;
    let columnsHeaders = ['Nombre','Cantidad','Categoria','Precio'];
    let items = this.products.map(p => ({Nombre: p.name, Cantidad: p.stock, Categoria: p.category, Precio: p.price}));
    const name = 'inventario de productos';
    
    this._pdfService.generate(header, columnsHeaders, items, name);

   /*let document:  TDocumentDefinitions = {
    
      content: [               
        {text:`Inventario de productos generado en la fecha ${new Date().toDateString()}`, fontSize: 14, bold: true, margin: [0, 20, 30, 8]},
        {
          style: 'Inventory_Table',
          table: {    
            headerRows: 1,
            widths: ['*','*','*','*'],        
            body: [
              [{text:'Nombre', style: 'tableHeader'}, {text: 'Cantidad en stock', style: 'tableHeader'}, {text: 'Categoría', style: 'tableHeader'}, {text:'Precio',style: 'tableHeader'}],
              ...this.products.map(p => [p.name, p.stock, p.category, p.price])
            ]
          },
          layout: 'lightHorizontalLines'
        }        
      ],  
      styles: {
        Inventory_Table: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }    
    };       
    
    pdfMake.createPdf(document).download('inventario de productos');*/


  }
}
