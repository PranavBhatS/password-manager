import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PasswordManagerService } from '../password-manager/password-manager.service';
import { Subject, map, of } from 'rxjs';
import { AppStateService } from '../app-state/app-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const appState = inject(AppStateService);
  const router = inject(Router)
  let obs: Subject<boolean> = new Subject()
  let ob = obs.asObservable()
  appState.setState().subscribe(val => {
    if (val) {
      obs.next(true)
    } else {
      router.navigate(['/'])
      obs.next(false)
    }
  })
  return ob
};
