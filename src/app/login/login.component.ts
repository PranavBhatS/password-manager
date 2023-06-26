import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordManagerService } from '../shared/password-manager/password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private passwordService: PasswordManagerService, private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  login() {
    if (this.loginForm.invalid) throw Error("Invalid password")
    this.passwordService.login(this.loginForm.value)
      .then(async (auth) => {
        console.log(auth)
        this.router.navigate(['/site-list'])
      })
      .catch(console.log)
  }



}
