import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Site } from '../models/site';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {
  passowrdForm: FormGroup
  passwordId: any;
  siteDetails!: Site
  constructor(public fb: FormBuilder, private route: ActivatedRoute,
    private passwordManager: PasswordManagerService) {
    this.route.queryParams.subscribe((res: Site | any) => {
      this.siteDetails = res;
    })
    this.passowrdForm = this.fb.group({
      id: [''],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]]
    })
  }
  onSubmit() {
    console.log(this.passowrdForm.value)
  }
}
