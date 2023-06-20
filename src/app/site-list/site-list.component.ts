import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { Site } from '../models/site';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoBarComponent } from './../shared/info-bar/info-bar.component'
@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  allSites !: Observable<Site[]>
  siteForm !: FormGroup;
  alertMessage !: string;
  constructor(public fb: FormBuilder, private passwordManager: PasswordManagerService) {
    this.siteForm = this.fb.group({
      id: [''],
      siteImgUrl: ['', [Validators.required]],
      siteName: ['', [Validators.required]],
      siteUrl: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.alertMessage = ""
    this.loadSites()
  }

  onSubmit(): boolean | void {
    if (this.siteForm.invalid) return false;
    let site: Site = this.siteForm.value;
    if (!site.id) {
      delete site.id
      this.passwordManager.addSite(site).then(() => {
        this.alertMessage = `${site.siteName} added successfully`
        this.siteForm.reset()
      }, err => {
        console.error(err)
      })
    } else {
      this.passwordManager.updateSite(site).then(() => {
        this.alertMessage = `${site.siteName} updated successfully`
        this.siteForm.reset()
      }, err => {
        console.error(err)
      })
    }
  }

  get siteId(): string {
    return this.siteForm.get('id')?.value
  }

  loadSites() {
    this.allSites = this.passwordManager.loadSites()
  }
  editSite(site: Site) {
    this.alertMessage = ""
    this.siteForm.reset(site)
  }
  deleteSite(site: Site) {
    this.passwordManager.deleteSite(site.id).then(() => {
      this.alertMessage = `${site.siteName} deleted successfully`
      this.siteForm.reset()
    }, err => {
      console.error(err)
    })
  }
}
