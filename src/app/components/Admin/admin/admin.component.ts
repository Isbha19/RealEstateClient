import { Component } from '@angular/core';
import { AdminService } from '../../../core/service/admin.service';
import { MemberView } from '../../../core/model/admin/memberView';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  members:MemberView[]=[];
  constructor(private adminService:AdminService){}

ngOnInit(): void {
this.adminService.getMembers().subscribe({
  next:members=>this.members=members
})}
}
