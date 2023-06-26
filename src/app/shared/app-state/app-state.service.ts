import { Injectable } from '@angular/core';
import { PasswordManagerService } from '../password-manager/password-manager.service';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  appState: Subject<boolean> = new Subject()
  appStateObs = this.appState.asObservable()
  constructor(private passwordManager: PasswordManagerService) { }

  setState() {
    let obs: Subject<boolean> = new Subject()
    let ob = obs.asObservable()
    let validator = (user: any) => {
      console.log(user)
      if (user) {
        obs.next(true)
        this.appState.next(true)
      }
      else {
        obs.next(false)
        this.appState.next(false)
      }
    }
    this.passwordManager.validateIdToken(validator)
    return ob
  }


  getState() {
    return this.appStateObs
  }
}
