import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { TableComponent } from '../../../components/table/table.component';
import { DialogComponent } from '../../../components/dialog/dialog.component';

import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client_service/client.service';



import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ MatDialogModule, TableComponent ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{
  public clients:Array<Client> = [];
  

  private userId:string = '';

  constructor(private _clientService:ClientService, private _dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('id')!;

    this._clientService.findAll(this.userId).subscribe({
      next: res => {
        if(res.status === 409 && res.response.error !== 'No existen clientes registrados para este usuario') {
          Swal.fire({
            icon: 'error',
            title: res.response.error,
          });
        } else if(res.status === 409 && res.response.error === 'No existen clientes registrados para este usuario') {
          this.clients = [];
        } else {
          this.clients = res;
        }
      }
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
  }
}
