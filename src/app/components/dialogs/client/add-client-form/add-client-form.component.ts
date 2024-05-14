import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWandMagicSparkles, faUserAlt, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { CreateClientInterface } from '../../../../interfaces/client_interfaces/create-client';
import { UpdateClientInterface } from '../../../../interfaces/client_interfaces/update-client';



@Component({
  selector: 'app-add-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './add-client-form.component.html',
  styleUrl: './add-client-form.component.scss'
})
export class AddClientFormComponent {
  public sparksIcon = faWandMagicSparkles;
  public nameIcon = faUserAlt;
  public ciIcon = faIdBadge;

  private client:CreateClientInterface;
  
  @Output() clientAdded = new EventEmitter<CreateClientInterface>();


  public addClientForm = new FormGroup({    
    name: new FormControl('', Validators.pattern(/^[a-zA-Záéíóúñ\s]*$/)),
    ci: new FormControl('', Validators.pattern(/^[0-9]{11,}/)),    
  });
  
  constructor( ) {
    this.client = {
      userId : localStorage.getItem('id')!,
      name : '',
      ci: ''
    }    
  }
  

  onSubmit() {
    this.client.name = this.addClientForm.value.name!;
    this.client.ci = this.addClientForm.value.ci!;

    this.clientAdded.emit(this.client);

  }
}


