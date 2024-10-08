import { Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { AddClientFormComponent } from '../dialogs/client/add-client-form/add-client-form.component';
import { UpdClientFormComponent } from '../dialogs/client/upd-client-form/upd-client-form.component';
import { AddProductFormComponent } from '../dialogs/product/add-product-form/add-product-form.component';
import { UpdateProductFormComponent } from '../dialogs/product/update-product-form/update-product-form.component';
import { AddWarrantyFormComponent } from '../dialogs/warranty/add-warranty-form/add-warranty-form.component';
import { UpdWarrantyFormComponent } from '../dialogs/warranty/upd-warranty-form/upd-warranty-form.component';



@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatDialogModule,
    AddClientFormComponent,
    UpdClientFormComponent,
    AddProductFormComponent,
    UpdateProductFormComponent,
    AddWarrantyFormComponent,
    UpdWarrantyFormComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  public closeIcon = faClose;
  public sparksIcon = faWandMagicSparkles;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onAddItem(response:any){
    this.data.dataObject = response;
    this.dialogRef.close(this.data.dataObject);
  }

  onItemUpdated(response:any) {    
    this.data.dataObject = response;
    this.dialogRef.close(this.data.dataObject);
  }
  
  onAccept() {
    this.data.dataObject = 'accept';
    this.dialogRef.close(this.data.dataObject);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
