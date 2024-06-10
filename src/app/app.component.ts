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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CarouselModule,NavbarComponent,HeaderComponent,
    SearchComponent,CategoryComponent,AboutComponent,PropertyListComponent,
    CallToActionComponent,AgentListComponent,TestimonialComponent,FooterComponent,LoadingSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RealEstateClient';
  constructor(private accountService:AccountService){}
  ngOnInit(): void {
 this.refreshUser();
  }


private refreshUser(){
  const jwt=this.accountService.getjwt();
if(jwt){
  
  this.accountService.refreshUser(jwt).subscribe({
    next:_=>{},
    error:_=>{
      this.accountService.logout();
    }
  })
}else{

  this.accountService.refreshUser(null).subscribe();
}
}
  
  

}