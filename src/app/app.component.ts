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
  isLoading = true;

  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn = auth.getUser();

    router.events.subscribe((event: RouterEvent) => {
      if (event.constructor.name === 'NavigationEnd' && this.isLoading === true) {
        const loading = document.getElementById('loading-panel');
        if (loading !== null ) {
          this.isLoading = false;
          setTimeout(() => {
            loading.parentNode.removeChild(loading);
          }, 2000);
        }
      }
    });
  }
}
