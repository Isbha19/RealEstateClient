import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
declare var jQuery: any;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CarouselModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RealEstateClient';
 

  ngAfterViewInit() {
 (function ($) {
   $(document).ready(function () {
     $('.header-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      items: 1,
      dots: true,
      loop: true,
      nav : true,
      navText : [
          '<i class="bi bi-chevron-left"></i>',
          '<i class="bi bi-chevron-right"></i>'
      ]
     });
   });
 })(jQuery);

 (function ($) {
  $(document).ready(function () {
    $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      margin: 24,
      dots: false,
      loop: true,
      nav : true,
      navText : [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>'
      ],
      responsive: {
          0:{
              items:1
          },
          992:{
              items:2
          }
      }
    });
  });
})(jQuery);
}

}