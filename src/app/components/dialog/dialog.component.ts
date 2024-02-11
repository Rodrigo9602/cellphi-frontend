import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { AddClientFormComponent } from '../dialogs/client/add-client-form/add-client-form.component';
import { UpdClientFormComponent } from '../dialogs/client/upd-client-form/upd-client-form.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, MatDialogModule, AddClientFormComponent, UpdClientFormComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  public closeIcon = faClose;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  onCancel() {
    this.dialogRef.close();
  }
}
