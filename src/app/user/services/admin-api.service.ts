import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Admin} from "../models/admin.model";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class AdminApiService extends BaseService<Admin>{

  constructor(http: HttpClient) {
    super(http);
    this.extraUrl = environment.adminURL;
  }

  setAdminId(admin_id: number) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('admin_id', admin_id.toString());
    }
  }

  getAdminId(): number {
    if (typeof window !== 'undefined' && window.localStorage) {
      const admin_id = localStorage.getItem('admin_id');
      return admin_id ? parseInt(admin_id) : 0;
    }
    return 0;
  }
}

