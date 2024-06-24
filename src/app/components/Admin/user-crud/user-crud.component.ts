import { Component } from '@angular/core';
import { MemberView } from '../../../core/model/admin/memberView';
import { AdminService } from '../../../core/service/admin.service';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss'
})
export class UserCrudComponent {
members:MemberView[]=[];

constructor(private adminService:AdminService){}
ngOnInit(): void {
  
this.adminService.getMembers().subscribe({
 next:members=>this.members=members
})}
}


