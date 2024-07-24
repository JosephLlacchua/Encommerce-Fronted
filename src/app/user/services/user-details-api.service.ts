import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {UserDetails} from "../models/userDetails.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsApiService extends BaseService<UserDetails>{

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.userDetailURL;
  }

  setUserDetailId(userDetail_id: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('userDetail_id', userDetail_id.toString());
    }
  }

  getUserDetailId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userDetail_id = localStorage.getItem('userDetail_id');
      return userDetail_id ? parseInt(userDetail_id) : 0;
    }
    return 0;
  }
}
