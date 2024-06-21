import { LoadingSpinnerComponent } from './components/User/shared/loading-spinner/loading-spinner.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { TestimonialComponent } from './components/User/testimonial/testimonial.component';

import { CommonModule } from '@angular/common';

import { AccountService } from './core/service/account.service';
import { AboutComponent } from './components/User/about/about.component';
import { AgentListComponent } from './components/User/agent-list/agent-list.component';
import { CallToActionComponent } from './components/User/call-to-action/call-to-action.component';
import { CategoryComponent } from './components/User/category/category.component';
import { FooterComponent } from './components/User/layouts/footer/footer.component';
import { HeaderComponent } from './components/User/layouts/header/header.component';
import { PropertyListComponent } from './components/User/property-list/property-list.component';
import { SearchComponent } from './components/User/search/search.component';
import { NavbarComponent } from './components/User/shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CarouselModule,
    NavbarComponent,
    HeaderComponent,
    SearchComponent,
    CategoryComponent,
    AboutComponent,
    PropertyListComponent,
    CallToActionComponent,
    AgentListComponent,
    TestimonialComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading: boolean = true; // Flag to track loading state
  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.refreshUser();
  }

  private refreshUser() {
    const jwt = this.accountService.getjwt();
    
    if (jwt) {
      console.log(jwt);
      
      this.accountService.refreshUser(jwt).subscribe({
        next: (_) => {
          this.loading = false;
        },
        error: (_) => {
          this.accountService.logout();
          this.loading = false;
        },
      });
    } else {
      this.accountService.refreshUser(null).subscribe();
      this.loading = false;
    }
  }
}
