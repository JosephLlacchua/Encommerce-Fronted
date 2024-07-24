import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../../../user/models/user.model";


@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  user = new User();
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      // Aquí deberías agregar la lógica de registro
      console.log('Formulario de registro válido', this.registerForm.value);
      this.snackBar.open('Registro exitoso', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = "Por favor, completa todos los campos correctamente.";
      this.snackBar.open(this.errorMessage, 'Cerrar', { duration: 3000 });
    }
  }
}
