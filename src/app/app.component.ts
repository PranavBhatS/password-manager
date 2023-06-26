import { Component } from '@angular/core';
import { AppStateService } from './shared/app-state/app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'password-manager';
  isLoggedIn = false;
  constructor(private appStateService: AppStateService, private router: Router) {
    this.appStateService.getState().subscribe((val) => {
      console.log(val)
      this.isLoggedIn = val
      // if (!val) {
      //   this.router.navigate([''])
      // }
    })
  }

}
