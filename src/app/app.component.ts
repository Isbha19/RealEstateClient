import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { CategoryComponent } from './components/category/category.component';
import { AboutComponent } from './components/about/about.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountService } from './service/account.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

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
