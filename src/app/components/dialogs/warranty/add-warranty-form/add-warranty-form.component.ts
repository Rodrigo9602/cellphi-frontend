import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWandMagicSparkles, faFileAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { CreateWarrantyInterface } from '../../../../interfaces/warranty_interfaces/create-warranty';
import { Product } from '../../../../models/product';
import { Client } from '../../../../models/client';

import { InitService } from '../../../../services/init_service/init.service';
import { SelectComponent } from '../../../select/select.component';

@Component({
  selector: 'app-add-warranty-form',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, SelectComponent],
  templateUrl: './add-warranty-form.component.html',
  styleUrl: './add-warranty-form.component.scss'
})
export class AddWarrantyFormComponent implements OnInit {
  public sparksIcon = faWandMagicSparkles;
  public nameIcon = faFileAlt;
  public daysIcon = faCalendarAlt;
  public clients:Array<Client> = [];

  private warranty: CreateWarrantyInterface;
  @Input() productData?:Product; 
  @Output() warrantyAdded =  new EventEmitter<CreateWarrantyInterface>();

  public addWarrantyForm = new FormGroup({ 
    clientId: new FormControl(''), 
    productId: new FormControl(''),    
    days: new FormControl('', Validators.pattern(/^[0-9]*$/)),    
  });

  constructor(private _init:InitService){
    this.warranty = {
      userId: localStorage.getItem('id')!,
      clientId: '',
      productId: '',
      days: 0
    }
  }

  ngOnInit(): void {
    if(this.productData) {
      this.addWarrantyForm.patchValue({
        productId: this.productData?._id
      });
    }

    this._init.clients$.subscribe(clients => {
      this.clients = clients;
    });
    
  }

  onClientSelected(event:any) {
    this.addWarrantyForm.patchValue({
      clientId: event._id
    });
  }

  onSubmit() {   
    this.warranty.clientId = this.addWarrantyForm.value.clientId!;
    this.warranty.productId = this.addWarrantyForm.value.productId!;
    this.warranty.days = Number(this.addWarrantyForm.value.days!);

    this.warrantyAdded.emit(this.warranty);
  };
}
