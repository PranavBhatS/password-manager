import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordManagerService } from '../shared/password-manager/password-manager.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Site } from '../models/site';
import { Password } from '../models/password';
import { PasswordEncryptDecryptService } from '../shared/password-encrypt-decrypt/password-encrypt-decrypt.service';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {
  passowrdForm: FormGroup
  siteDetails!: Site
  passwordDetails?: Observable<Password[]>
  constructor(public fb: FormBuilder, private route: ActivatedRoute,
    private passwordManager: PasswordManagerService, private encryptDecryptService: PasswordEncryptDecryptService) {
    this.route.queryParams.subscribe((res: Site | any) => {
      this.siteDetails = res;
    })
    this.passowrdForm = this.fb.group({
      id: [''],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      userName: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.loadPassword()
  }
  get passwordId(): string {
    return this.passowrdForm.get('id')?.value
  }
  onSubmit() {
    console.log(this.passowrdForm.value)
    if (this.passowrdForm.invalid) return
    let { id, password } = this.passowrdForm.value;
    const actionFunc = id ? this.passwordManager.updatePassword.bind(this.passwordManager) : this.passwordManager.addPassword.bind(this.passwordManager)
    if (!id) delete this.passowrdForm.value.id
    this.passowrdForm.value.password = this.encryptDecryptService.encrypt(password)
    console.log(password)
    console.log(this.passowrdForm.value)
    actionFunc(this.passowrdForm.value, this.siteDetails.id || '').then(res => {
      console.log("success");
      this.passowrdForm.reset()
    })
      .catch(console.log)
  }


  loadPassword() {
    this.passwordDetails = this.passwordManager.loadPasswords(this.siteDetails.id)
  }

  editPassword(pass: Password) {
    this.passowrdForm.reset({ ...pass })
  }

  deletePassword(pass: Password) {
    this.passwordManager.deletePassword(pass.id || '', this.siteDetails.id || '')
      .then(res => console.log("success"))
      .catch(err => console.log)
  }
}
