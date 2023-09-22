import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Status } from '../globals';

@Injectable()
export class AuthGuard  {

  constructor(private router: Router, private status: Status) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (sessionStorage.getItem('RBN3currentUser') && this.status.Userid !== 0 ) {
        // logged in so return true
        return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
  }
}
