import { Component } from '@angular/core';
import { MemberView } from '../../../core/model/admin/memberView';
import { AdminService } from '../../../core/service/admin.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss'
})
export class UserCrudComponent {
members:MemberView[]=[];

constructor(private adminService:AdminService){}
ngOnInit(): void {
  

  
this.adminService.getMembers().subscribe({
 next:members=>this.members=members 
})

console.log(this.members);}
}


