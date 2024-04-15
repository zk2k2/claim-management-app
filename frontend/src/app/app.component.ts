import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { NavbarComponent } from './component/navbar/navbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Avidea Claims';

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    // localStorage.clear();
  }
}
