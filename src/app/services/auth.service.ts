import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Router, NavigationExtras } from '@angular/router';


@Injectable()
export class AuthService {
  isLoggedIn=this.openUrl();
  redirectUrl: string;
  apiKey:string;
  userData={};

  openUrl(){ if (this.GetCookieValue('apiKey')){ return true; } else{ return false; } }

  GetCookieValue(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
}

