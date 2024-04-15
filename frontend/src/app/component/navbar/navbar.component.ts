import { Component } from '@angular/core';
import { LogoutService } from 'src/app/service/logout/logout.service';
import { Router } from '@angular/router';
import {
  faEllipsisVertical,
  faRightFromBracket,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  faElipsisVertical = faEllipsisVertical;
  faRightFromBracket = faRightFromBracket;
  faHouse = faHouse;
  constructor(private logoutService: LogoutService, private router: Router) {}

  logout(): void {
    this.logoutService.logout();
    this.router.navigate(['/login']);
  }

  navigateToHome(): void {
    this.router.navigate(['/claims']);
  }
}
