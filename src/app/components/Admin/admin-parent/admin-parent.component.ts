import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './../admin-navbar/admin-navbar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-parent',
  standalone: true,
  imports: [AdminNavbarComponent,AdminSidebarComponent,AdminFooterComponent],
  templateUrl: './admin-parent.component.html',
  styleUrl: './admin-parent.component.scss'
})
export class AdminParentComponent {

}
