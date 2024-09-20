import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Cambiado a MatInputModule
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router'; // Corrected import
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../../../user/models/user.model";
import { AuthenticationApiService } from "../../services/authentication-api.service";
import { UserApiService } from "../../../user/services/user-api.service";
import { AdminApiService } from "../../../user/services/admin-api.service";
import { UserDetailsApiService } from "../../../user/services/user-details-api.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, // Cambiado a MatInputModule
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corregido a styleUrls
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  loginAttempts: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticationApiService: AuthenticationApiService,
    private userApiService: UserApiService,
    private adminApiService: AdminApiService,
    private userDetailsApiService: UserDetailsApiService
  ) {}

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
            this.snackBar.open('Bienvenido ' + admin.fullname + ' 🤗', 'Cerrar', {
              duration: 2000
            });
          } else {
            this.userDetailsApiService.getAll().subscribe((data) => {
              const userDetail = data.find(userDetail => userDetail.userId === userId);
              if (userDetail) {
                this.userApiService.setIsAdmin(false);
                this.userDetailsApiService.setUserDetailId(userDetail.id);
                this.router.navigateByUrl('/user/view');
                this.snackBar.open('Bienvenido ' + userDetail.fullname + ' 🤗', 'Cerrar', {
                  duration: 2000
                });
              }
            });
          }
        });
      }, error => {
        this.snackBar.open('Error. Credenciales no encontradas 😥', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }
}
