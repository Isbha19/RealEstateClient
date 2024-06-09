import { MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
constructor(private dialog:MatDialog){}
 LoginPopUp(){
this.OpenPopUp('Login')
  }

  registerPopUp(){    
this.OpenPopUp('Create Account')
  }
  OpenPopUp(title:any){
 this.dialog.open(RegisterComponent,{
  width:'60%',
data:{
  title:title,
}
  
})
  }
}
