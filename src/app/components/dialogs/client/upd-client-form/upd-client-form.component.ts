import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWandMagicSparkles, faFileAlt, faIdBadge } from '@fortawesome/free-solid-svg-icons';

import { UpdateClientInterface } from '../../../../interfaces/client_interfaces/update-client';
import { Client } from '../../../../models/client';

@Component({
  selector: 'app-upd-client-form',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './upd-client-form.component.html',
  styleUrl: './upd-client-form.component.scss'
})
export class UpdClientFormComponent implements OnInit {
  public sparksIcon = faWandMagicSparkles;
  public nameIcon = faFileAlt;
  public ciIcon = faIdBadge;

  @Input() client: Client;
  private clientUpdated: UpdateClientInterface;

  @Output() clientEmitted = new EventEmitter<UpdateClientInterface>();


  public updClientForm = new FormGroup({
    name: new FormControl('', Validators.pattern(/^[0-9a-zA-Záéíóúñ/-_\s]*$/)),
    ci: new FormControl('', Validators.pattern(/^[0-9]{11,}/)),
  });

  constructor() {
    this.client = {
      _id: '',
      name: '',
      ci: '',
      orders: [],
      userId: localStorage.getItem('id')!,
    };

    this.clientUpdated = {
      name: '',  
      ci: ''    
    }
  };

  ngOnInit(): void {
    this.updClientForm.patchValue({
      name: this.client.name,
      ci: this.client.ci,
    });
  }

  onSubmit() {
    this.clientUpdated.name = this.updClientForm.value.name!;
    this.clientUpdated.ci = this.updClientForm.value.ci!;
    

    this.clientEmitted.emit(this.clientUpdated);
  }

}
