import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faHamburger,
  faHeart,
  faShoppingBag,
  faBars,
  faHome,
  faUserMd,
  faUserInjured
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styles: `
    .active-link {
    color: "#d1d5dc";
    text-decoration: underline;
  }
  `,
})
export class HeaderComponent {


  faCartShopping = faCartShopping;
  faShoppingBag = faShoppingBag;
  faHamburger = faHamburger;
  faHeart = faHeart;
  faBars = faBars
  faHome = faHome;
  faUserMd = faUserMd;
  faUserInjured = faUserInjured;
}
