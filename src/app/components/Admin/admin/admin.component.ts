import { DynamicAssetLoaderService } from './../../../core/service/dynamic-asset-loader.service';
import { Component } from '@angular/core';
import { AdminService } from '../../../core/service/admin.service';
import { MemberView } from '../../../core/model/admin/memberView';
import { AdminParentComponent } from '../admin-parent/admin-parent.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminParentComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  members:MemberView[]=[];
  constructor(private adminService:AdminService,private dynamicLoading:DynamicAssetLoaderService ){}

ngOnInit(): void {
  this.dynamicLoading.loadAdminAssets();
// this.adminService.getMembers().subscribe({
//   next:members=>this.members=members
// })}
}
}