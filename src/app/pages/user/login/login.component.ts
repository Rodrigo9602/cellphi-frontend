import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SessionService } from '../../../services/session_service/session.service';

import { faEye, faEyeSlash, faWandMagicSparkles, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import { Toast } from '../../../global/toast.global';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public sparksIcon = faWandMagicSparkles;
  public showIcon = faEye;
  
  public emailIcon = faEnvelope;
  public passwordIcon = faLock;
  public date: String = new Date().toDateString();
  public showPassword:Boolean = false;
  public loginForm = new FormGroup({    
    userEmail: new FormControl('', Validators.email),
    userPassword: new FormControl('', Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)),    
  });

  constructor( private _session: SessionService, private _router:Router){ }

  ngOnInit(): void {
    localStorage.clear();
  }


  onShowPassword() {
    this.showPassword = !this.showPassword;
    this.showPassword ? this.showIcon = faEyeSlash : this.showIcon = faEye;
  }

  onSubmit() {
    
    this._session.login(this.loginForm.value.userEmail!, this.loginForm.value.userPassword!).subscribe({
      next: res => {
        if(res.status === 401) {
          Toast.fire({
            icon: 'error',
            title: res.options.message
          });
        } else {
          this._session.setSession(res.id, res.access_token);          
          Toast.fire({
            icon: 'success',
            title: 'Sesion iniciada'
          });
          this._router.navigate(['/home']);
        }
      },
      error: e => {console.log(e);}
    })
  }

 
  
}
