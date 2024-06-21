import { RouterOutlet } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './../admin-navbar/admin-navbar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-parent',
  standalone: true,
  imports: [AdminNavbarComponent,AdminSidebarComponent,AdminFooterComponent,AdminDashboardComponent,RouterOutlet],
  templateUrl: './admin-parent.component.html',
  styleUrl: './admin-parent.component.scss'
})
export class AdminParentComponent {
  
}
