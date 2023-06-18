import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { Site } from '../models/site';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  allSites !: Observable<Site[]>
  constructor(private passwordManager: PasswordManagerService) { }

  ngOnInit(): void {
    this.loadSites()
  }

  onSubmit(values: Site) {
    this.passwordManager.addSite(values).then(() => {
      console.log("Data saved successfully")
    }, err => {
      console.error(err)
    })
  }

  loadSites() {
    this.allSites = this.passwordManager.loadSites()
  }
}
