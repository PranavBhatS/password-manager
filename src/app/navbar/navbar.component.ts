import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordManagerService } from '../shared/password-manager/password-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private passManager: PasswordManagerService) {

  }
  logout() {
    this.passManager.logout()
  }
}
