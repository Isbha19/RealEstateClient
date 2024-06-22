import { AdminFooterComponent } from './../admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './../admin-navbar/admin-navbar.component';
import { ActivatedRouteSnapshot, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { DynamicAssetLoaderService } from './../../../core/service/dynamic-asset-loader.service';
import { Component } from '@angular/core';
import { AdminService } from '../../../core/service/admin.service';
import { MemberView } from '../../../core/model/admin/memberView';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,AdminNavbarComponent,AdminSidebarComponent,AdminFooterComponent],
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