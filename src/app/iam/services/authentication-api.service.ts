import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { BaseService } from "../../shared/services/base.service";
import { catchError, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService extends BaseService<any> {

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.authenticationURL;
  }

  signUp(username: string, password: string, role: string) {
    const user = { "username": username, "password": password, "roles": [role] };
    return this.http.post(this.buildPath() + '/sign-up', user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  signIn(username: string, password: string) {
    const user = { "username": username, "password": password };
    return this.http.post(this.buildPath() + '/sign-in', user, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        tap((response: any) => {
          this.newToken(response["token"]);
        })
      );
  }
}
