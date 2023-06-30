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

  login(): void {
    if (this.loginForm.invalid) throw Error("Invalid password")
    this.passwordService.login(this.loginForm.value)
      .then(async (auth) => {
        console.log(auth);
        const doLogin = () => {
          this.router.navigate(['/site-list'])
        }
        let userList = await this.passwordService.getUserById(auth.user.email || '')
        console.log(userList)
        if (userList.empty) {
          this.passwordService.addUser({
            email: auth.user.email,
            username: auth.user.email,
            uid: auth.user.uid
          }).then((user) => {
            console.log(user.id)
            localStorage.setItem("user", user.id)
            // doLogin()
          })
        } else {

          localStorage.setItem("user", JSON.stringify(userList.docs[0].data))
          // doLogin()
        }
      })
      .catch(console.log)
  }



}
