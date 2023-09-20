import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationSkipped } from '@angular/router';


import { filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  constructor(private router: Router  ) { }

  emitOnNavEnd (){
    return this.router.events.pipe(
      filter((e): e is NavigationEnd  => e instanceof NavigationEnd),
      map(e => {
        // e is now NavigationEnd
      })
    )
  }

  emitOnNavSkipped (){
    return this.router.events.pipe(
      filter((e): e is NavigationSkipped  => e instanceof NavigationSkipped),
      map(e => {
        // e is now NavigationSkipped
      })
    )
  }

}
