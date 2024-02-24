import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { User } from '../../models/user';
import { UserService } from '../../services/user_service/user.service';
import { SessionService } from '../../services/session_service/session.service';
import { InitService } from '../../services/init_service/init.service';

import { ClientComponent } from '../page-modules/client/client.component';
import { OrderComponent } from '../page-modules/order/order.component';
import { ProductComponent } from '../page-modules/product/product.component';
import { FacilityComponent } from '../page-modules/facility/facility.component';
import { WarrantyComponent } from '../page-modules/warranty/warranty.component';

import { faMoon, faSun, faUser, faFileAlt, faBox, faGear, faFileSignature, faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faStaylinked } from '@fortawesome/free-brands-svg-icons';
import { Toast } from '../../global/toast.global';
import { ModeService } from '../../services/mode_service/mode.service';
import Swal from 'sweetalert2';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ClientComponent, OrderComponent, ProductComponent, FacilityComponent, WarrantyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private user:User;
  private userId:string = '';
  private products: Array<Product> = [];

  public currentMode: boolean = true;
  public userName: string = '';
  public userMenuHide: boolean = true;
  public selectedView: string = 'clients';

  public sideIcon = faStaylinked;
  public clientIcon = faUser;
  public orderIcon = faFileAlt;
  public productIcon = faBox;
  public serviceIcon = faGear;
  public warrantyIcon = faFileSignature;
  public modeIcon = faMoon;
  public notificationIcon = faBell;
  public logoutIcon = faRightFromBracket;

  constructor(
    private _userService:UserService,
    private _router: Router,
    private _mode: ModeService,
    private _session: SessionService,
    private _init: InitService
    ) {

    this.user = {
      _id: '',
      name: '',
      email: '',
      password: ''
    };

  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id')!;

    this._userService.findOne(this.userId).subscribe({
      next: res => {
        if(res.status === 409) {
          Toast.fire({
            icon: 'error',
            title: 'Ha ocurrido un error al iniciar sesion'
          });
          this._router.navigate(['/']);
        } else {
          this.user = res;
          this.userName = this.user.name;
        }        
      }
    });

    // initializations
    
    this._init.initProducts(this.userId).subscribe({
      next: res => {        
        if(res.status === 409 && res.response.error !== 'No existen productos registrados para este usuario actualmente') {
          Swal.fire({
            icon: 'error',
            title: res.response.error,
          });
        } else if(res.status === 409 && res.response.error === 'No existen productos registrados para este usuario actualmente') {
          this.products = [];          
        } else {
          this.products = res;
        }        
        this._init.updateProductsList(this.products); 
      }
    })

  }

  onChangeMode() {
    this.currentMode = !this.currentMode;
    this.currentMode ? this.modeIcon = faMoon : this.modeIcon = faSun;
    this._mode.changeMode(this.currentMode);
  };

  onUserMenu() {
    this.userMenuHide = !this.userMenuHide;
  };

  onSelectView(view:string) {
    this.selectedView = view;
  }

  onLogout() {
    this._session.logout();
  }

 
}
