import { AuthService } from './auth/auth.service';
import { Component} from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn: any;

  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn = auth.getUser();
    router.events.subscribe((event: RouterEvent) => {
      if (event.id === 1 && event.constructor.name === 'NavigationEnd') {
        const loading = document.getElementById('loading-panel');
        loading.parentNode.removeChild(loading);
      }
    });
  }
}
