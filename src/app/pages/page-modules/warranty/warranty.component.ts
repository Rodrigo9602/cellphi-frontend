import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { TableComponent } from '../../../components/table/table.component';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { SearchBarComponent } from '../../../components/search-bar/search-bar.component';

import { Warranty } from '../../../models/warranty';
import { WarrantyService } from '../../../services/warranty_service/warranty.service';
import { BehaviorSubject } from 'rxjs';

import { InitService } from '../../../services/init_service/init.service';
import { Toast } from '../../../global/toast.global';
import { search_bar } from '../../../types/search-bar';

import { PdfService } from '../../../services/pdf_service/pdf.service';

@Component({
  selector: 'app-warranty',
  standalone: true,
  imports: [MatDialogModule, TableComponent, SearchBarComponent],
  templateUrl: './warranty.component.html',
  styleUrl: './warranty.component.scss'
})
export class WarrantyComponent implements OnInit{
  public warranties: Array<Warranty> = [];
  public warrantyList: Array<Warranty> = [];
  warranty$ = new BehaviorSubject<Warranty[]>([]); 

  public filters = ['id', 'id de cliente', 'fecha'];
  public searchActive: boolean = false;

  constructor(private _initService:InitService, private _dialog: MatDialog, public _pdfService: PdfService, private _warrantyService:WarrantyService) {}
  
  ngOnInit(): void {
    this._initService.warranties$.subscribe((warranties:Array<Warranty>) => {
      this.warranties = warranties;
      this.warranty$.next(warranties);
    });   
  }

  

  onAddWarranty() {
    const dialogRef = this._dialog.open(
      DialogComponent, {
      width: '30%',
      minWidth: '20rem',
      minHeight: '500px',
      data: { form: 'addWarranty', dataObject: {} }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {        
        this._warrantyService.create(res).subscribe({
          next: res => {
            this.warranties.push(res);
            this._initService.updateWarrantyList(this.warranties);

            Toast.fire({
              icon: 'success',
              title: 'Garantía registrada'
            });
          },
          error: e => { console.log(e) }
        })
      } 
    });
  }
  
  onCreateRegister() {}
  
  onSelected(event: any) {
    let dialogRef;
    let item = event.item; 
    switch (event.operation) {
      case 'update':   

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
            this._warrantyService.delete(item._id).subscribe({
              next: res => {
                this.warranties = this.warranties.filter(e => e._id != res._id);
                this._initService.updateWarrantyList(this.warranties);
              },
              error: e => { console.log(e) }
            });
          }
        });
        break;
    }
  }

  onSearch(searchData: search_bar) {}

  onEndSearch() {
    this._initService.updateWarrantyList(this.warranties);
    this.searchActive = false;
  }
}
