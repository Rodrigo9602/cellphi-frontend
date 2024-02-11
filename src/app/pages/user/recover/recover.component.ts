import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Params, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserService } from '../../../services/user_service/user.service';

import { faEye, faEyeSlash, faWandMagicSparkles, faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import { Toast } from '../../../global/toast.global';
import Swal from 'sweetalert2';
import { UpdateUserInterface } from '../../../interfaces/user_interfaces/update-user';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.scss'
})
export class RecoverComponent implements OnInit{
  public token:string = '';

  public sparksIcon = faWandMagicSparkles;
  public showIcon = faEye; 
  public showConfirmationIcon = faEye; 
  public passwordIcon = faLock;  
  public emailIcon = faEnvelope;

  public date: String = new Date().toDateString();

  public showPassword:Boolean = false;
  public showPasswordConfirmation:Boolean = false;

  public recoverForm = new FormGroup({    
    userEmail: new FormControl('', Validators.email),    
  });

  public passwordForm = new FormGroup({    
    userPassword: new FormControl('', Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)),
    userPasswordConfirmation: new FormControl('', Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)),     
  });

  constructor(private _route:ActivatedRoute, private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params:Params)=> {
      if(params['token']) {
        this.token = params['token'];   
      }         
    });
    
  }

  onRecover() {
    this._userService.recover(this.recoverForm.value.userEmail!).subscribe({
      next: res => {         
        if(res.status === 409) {
          Toast.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            timer:2000
          });
        } else {
          Swal.fire({
            icon: 'success',
            position: 'center',
            title: res.header,
            text: res.text,
            showConfirmButton: true
          });
        }
      },      
    });
  }

  onChangePassword() {   
    const updateUser: UpdateUserInterface = {
      password: this.passwordForm.value.userPassword!
    }
    this._userService.changePassword(this.token, updateUser).subscribe({
      next: res => { 
        Toast.fire({
          icon: 'success',
          title: 'Contraseña actualizada',
          text: 'Por favor inicie sesion'
        });
        this._router.navigate(['/']);
      }
    });
  }

  
  onShowPassword(type:string) {
    if(type === 'password') {
      this.showPassword = !this.showPassword;
      this.showPassword ? this.showIcon = faEyeSlash : this.showIcon = faEye;
    } else {
      this.showPasswordConfirmation = !this.showPasswordConfirmation;
      this.showPasswordConfirmation ? this.showConfirmationIcon = faEyeSlash : this.showConfirmationIcon = faEye;
    }
    
  }
}
