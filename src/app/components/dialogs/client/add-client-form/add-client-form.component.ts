import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWandMagicSparkles, faUserAlt, faIdBadge } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-add-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './add-client-form.component.html',
  styleUrl: './add-client-form.component.scss'
})
export class AddClientFormComponent implements OnInit {
  public sparksIcon = faWandMagicSparkles;
  public nameIcon = faUserAlt;
  public ciIcon = faIdBadge;

  public addClientForm = new FormGroup({    
    name: new FormControl('', Validators.pattern(/^[a-zA-Záéíóúñ\s]*$/)),
    ci: new FormControl('', Validators.pattern(/^[0-9]{11,}/)),    
  });
  
  constructor( ) { }
  ngOnInit(): void {
    
  }

  onSubmit() {

  }
}
