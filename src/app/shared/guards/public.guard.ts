import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Subject, map, TruthyTypesOf } from 'rxjs';
import { PasswordManagerService } from '../password-manager/password-manager.service';
import { AppStateService } from '../app-state/app-state.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const appState = inject(AppStateService);
  const router = inject(Router)
  let obs: Subject<boolean> = new Subject()
  let ob = obs.asObservable()
  appState.setState().subscribe(val => {
    if (val) {
      router.navigate(['site-list'])
    }
    obs.next(true)
  })
  return ob
};
