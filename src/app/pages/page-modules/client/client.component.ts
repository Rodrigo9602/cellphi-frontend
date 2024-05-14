import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { TableComponent } from '../../../components/table/table.component';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { SearchBarComponent } from '../../../components/search-bar/search-bar.component';

import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client_service/client.service';
import { BehaviorSubject } from 'rxjs';

import { InitService } from '../../../services/init_service/init.service';
import { Toast } from '../../../global/toast.global';
import { search_bar } from '../../../types/search-bar';

import { PdfService } from '../../../services/pdf_service/pdf.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [MatDialogModule, TableComponent, SearchBarComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  public clients: Array<Client> = [];
  public clientsList: Array<Client> = [];
  clients$ = new BehaviorSubject<Client[]>([]);  


  public filters = ['id', 'nombre', 'carnet'];
  public searchActive: boolean = false;


  constructor(private _clientService: ClientService, private _initService:InitService, private _dialog: MatDialog, public _pdfService: PdfService) { }

  ngOnInit(): void {
    this._initService.clients$.subscribe((clients:Array<Client>)=>{
      this.clients = clients;
      this.clients$.next(clients);
    });
  }


  onAddClient() {
    const dialogRef = this._dialog.open(
      DialogComponent, {
      width: '30%',
      minWidth: '20rem',
      minHeight: '500px',
      data: { form: 'addClient', dataObject: {} }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res !== undefined) {
        this._clientService.create(res).subscribe({
          next: res => {
            this.clients.push(res);
            this._initService.updateClientsList(this.clients);

            Toast.fire({
              icon: 'success',
              title: 'Cliente añadido'
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
          data: { form: 'updClient', dataObject: item }
        });
        dialogRef.afterClosed().subscribe(res => {
          if (res !== undefined) {
            this._clientService.update(item._id, res).subscribe({
              next: res => {
                this._initService.updateClientsList(res);
                Toast.fire({
                  icon: 'success',
                  title: 'Cliente actualizado'
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
            this._clientService.delete(item._id).subscribe({
              next: res => {
                this.clients = this.clients.filter(e => e._id != res._id);
                this._initService.updateClientsList(this.clients);
              },
              error: e => { console.log(e) }
            });
          }
        });
        break;
    }
  }


  onSearch(searchData: search_bar) {
    
  }

  onEndSearch() {
    this._initService.updateClientsList(this.clientsList);
    this.searchActive = false;
  }

  onCreateRegister() {
    let header = `Listado de clientes generado en la fecha ${new Date().toDateString()}`;
    let columnsHeaders = ['Nombre','CI', 'Cantidad de órdenes registradas'];
    let items = [...this.clients.map(c => [c.name, c.ci, c.orders.length])]
    const name = 'listado de clientes';
    
    
    this._pdfService.generate(header, columnsHeaders, name, items);  

  }

}
