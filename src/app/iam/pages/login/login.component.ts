import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router'; // Corrected import
import { MatSnackBar } from "@angular/material/snack-bar";
import {User} from "../../../user/models/user.model";
import {AuthenticationApiService} from "../../services/authentication-api.service";
import {UserApiService} from "../../../user/services/user-api.service";
import {AdminApiService} from "../../../user/services/admin-api.service";
import {UserDetailsApiService} from "../../../user/services/user-details-api.service";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user = new User();
  errorMessage: string | null = null;
  loginAttempts: number = 0;

  constructor(private userApiService: UserApiService,
              private authenticationApiService: AuthenticationApiService,
              private userDetailsApiService: UserDetailsApiService,
              private adminApiService: AdminApiService,
              private router: Router,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    if (this.userApiService.isLogged()) {
      if (this.userApiService.getIsAdmin()) {
        this.router.navigateByUrl('/admin/view');
      } else {
        this.router.navigateByUrl('/user/view');
      }
    }
  }
  login() {
    if (this.loginAttempts > 3) {
      this.errorMessage = "Has alcanzado el límite de intentos de inicio de sesión. Por favor, inténtalo más tarde.";
      return;
    }

    this.loginAttempts++;

    this.authenticationApiService.signIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response: any) => {
        let userId = response['id'];
        this.userApiService.setUserId(userId);
        this.userApiService.setLogged(true);
        this.adminApiService.getAll().subscribe((data) => {
          const admin = data.find(admin => admin.userId === userId);
          if (admin) {
            this.userApiService.setIsAdmin(true);
            this.adminApiService.setAdminId(admin.id);
            this.router.navigateByUrl('/admin/view');
            this.snackBar.open('Bievenido ' + admin.fullname + ' 🤗', 'Cerrar', {
              duration: 2000
            });
          } else {
            this.userDetailsApiService.getAll().subscribe((data) => {
              const userDetail = data.find(userDetail => userDetail.userId === userId);
              if (userDetail) {
                this.userApiService.setIsAdmin(false);
                this.userDetailsApiService.setUserDetailId(userDetail.id);
                this.router.navigateByUrl('/user/view');
                this.snackBar.open('Bievenido ' + userDetail.fullname + ' 🤗', 'Cerrar', {
                  duration: 2000
                });
              }
            });
          }

        });

      }, error => {
        this.snackBar.open('Error. Credenciales no encontradas😥', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }
}
