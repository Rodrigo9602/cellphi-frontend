import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWandMagicSparkles, faFileAlt, faBox, faFilePen } from '@fortawesome/free-solid-svg-icons';

import { UpdateProductInterface } from '../../../../interfaces/product_interfaces/update-product';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-update-product-form',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './update-product-form.component.html',
  styleUrl: './update-product-form.component.scss'
})
export class UpdateProductFormComponent implements OnInit {
  public sparksIcon = faWandMagicSparkles;
  public nameIcon = faFileAlt;  
  public stockIcon = faBox;
  public categoryIcon = faFilePen;

  

  @Input() product:Product;
  @Output() productEmitted = new EventEmitter<UpdateProductInterface>();
  private productUpdated:UpdateProductInterface;

  public updProductForm = new FormGroup({    
    name: new FormControl('', Validators.pattern(/^[0-9a-zA-Záéíóúñ/-_\s]*$/)),    
    stock: new FormControl(0, Validators.pattern(/^[0-9]*$/)),
    category: new FormControl('', Validators.pattern(/^[a-zA-Záéíóúñ\s]*$/)),
    availability: new FormControl(true)
  });


  constructor() {
    this.product = {
      _id: '',
      name: '',
      category: '',
      price: 0,
      stock: 0,
      userId: '',
      availability: false,
      registerDate: new Date()
    };

    this.productUpdated = {
      name: '',
      availability: false,
      category: '',
      stock: 0
    }
  };

  ngOnInit(): void {
    this.updProductForm.patchValue({
      name: this.product.name,
      stock: this.product.stock,
      category: this.product.category,
      availability: this.product.availability
    });
  }

  onSubmit() {
    this.productUpdated.name = this.updProductForm.value.name!;
    this.productUpdated.stock = Number(this.updProductForm.value.stock!);
    this.productUpdated.category = this.updProductForm.value.category!;
    this.productUpdated.availability = this.updProductForm.value.availability!;

    this.productEmitted.emit(this.productUpdated);
  }
 

}
