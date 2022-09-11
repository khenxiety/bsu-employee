import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(public jwtHelper: JwtHelperService) { }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token')!;

    return !this.jwtHelper.isTokenExpired(token);



    
    // Check whether the token is expired and return
    // true or false
    
  }
}
