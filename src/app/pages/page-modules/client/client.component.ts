import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { TableComponent } from '../../../components/table/table.component';
import { DialogComponent } from '../../../components/dialog/dialog.component';

import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client_service/client.service';





@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ MatDialogModule, TableComponent ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  public clients:Array<Client> = [];
  

  private userId:string = '';

  constructor(private _clientService:ClientService, private _dialog: MatDialog) { }
  

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
