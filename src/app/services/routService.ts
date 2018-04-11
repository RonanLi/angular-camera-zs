import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { CameraService }      from './camera.service';

@Injectable()
export class RoutGuard implements CanActivate {
  constructor(private cameraService: CameraService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    if (this.cameraService.isLoggedIn) { return true; }
    // this.cameraService.redirectUrl = url;
    // this.router.navigate(['/login']);
    // this.router.navigate(['/index']);
    return false;
  }
}
