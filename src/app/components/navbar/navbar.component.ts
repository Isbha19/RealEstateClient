import { RegisterComponent } from './../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AccountService } from '../../service/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
constructor(private dialog:MatDialog,
  public accountService:AccountService
){}
 LoginPopUp(){
this.OpenPopUp(LoginComponent)
  }

  registerPopUp(){    
this.OpenPopUp(RegisterComponent)
  }
  OpenPopUp(Component:any){
 this.dialog.open(Component,{
  width:'60%',
  
})
  }
  Logout(){
    this.accountService.logout();
  }
}
