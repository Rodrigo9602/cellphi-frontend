import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWandMagicSparkles, faFileAlt, faBox, faFilePen, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { CreateProductInterface } from '../../../../interfaces/product_interfaces/create-product';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.scss'
})
export class AddProductFormComponent {
  public sparksIcon = faWandMagicSparkles;
  public nameIcon = faFileAlt;
  public priceIcon = faDollarSign;
  public stockIcon = faBox;
  public categoryIcon = faFilePen;

  private product:CreateProductInterface;

  @Output() productAdded = new EventEmitter<CreateProductInterface>();

  public addProductForm = new FormGroup({    
    name: new FormControl('', Validators.pattern(/^[0-9a-zA-Záéíóúñ/-_\s]*$/)),    
    stock: new FormControl('', Validators.pattern(/^[0-9]*$/)),
    category: new FormControl('', Validators.pattern(/^[a-zA-Záéíóúñ\s]*$/)),
    price: new FormControl('', Validators.pattern(/^[0-9]*$/)),
  });

  constructor(){
    this.product = {
      name: '',
      category: '',
      price: 0,
      stock: 0,
      userId: localStorage.getItem('id')!
    }
  }

  onSubmit() {    
    this.product.name = this.addProductForm.value.name!;
    this.product.category =  this.addProductForm.value.category!;
    this.product.price = Number(this.addProductForm.value.price!);
    this.product.stock = Number(this.addProductForm.value.stock!);  


    this.productAdded.emit(this.product);
  }
}
