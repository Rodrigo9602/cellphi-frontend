import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserService } from '../../../services/user_service/user.service';

import { faEye, faEyeSlash, faWandMagicSparkles, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { CreateUserInterface } from '../../../interfaces/user_interfaces/create-user';
import { Toast } from '../../../global/toast.global';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public sparksIcon = faWandMagicSparkles;
  public showIcon = faEye;
  public userIcon = faUser;
  public emailIcon = faEnvelope;
  public passwordIcon = faLock;

  public date: String = new Date().toDateString();

  public showPassword:Boolean = false;
  
  public registerForm = new FormGroup({
    userName: new FormControl('', Validators.pattern(/^[a-zA-Z0-9áéíóúñ\s]*$/)),
    userEmail: new FormControl('', Validators.email),
    userPassword: new FormControl('', Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)),    
  });
  
  private user:CreateUserInterface;

  constructor(private _user: UserService, private _router: Router) {
    this.user = {
      name: '',
      email: '',
      password: ''
    };
  }

  

  onShowPassword() {
    this.showPassword = !this.showPassword;
    this.showPassword ? this.showIcon = faEyeSlash : this.showIcon = faEye;
  }

  onSubmit() {
    
    this.user.name = this.registerForm.value.userName!;
    this.user.email = this.registerForm.value.userEmail!;
    this.user.password = this.registerForm.value.userPassword!;

    this._user.create(this.user).subscribe({
      next: res => {
        if(res.status === 409) {
          Toast.fire({
            icon: 'error',
            title: res.error
          });
        } else {
          Toast.fire({
            icon: 'success',
            title: 'Usuario registrado con éxito'
          });

          this._router.navigate(['/']);
        }
      },
      error: e => {console.log({error: e});}
    });
    
  }
}
