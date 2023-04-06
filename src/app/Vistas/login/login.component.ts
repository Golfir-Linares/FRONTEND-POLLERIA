import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../Servicios/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthResponse, AuthError } from 'src/app/Modelos/auth.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  token: string = "";
  miForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}

  login(){
    console.log(this.miForm.value);
    const { email, password } = this.miForm.value;
    this.api.login(email,password)
      .subscribe({
        next: (resp: AuthResponse) => {
          console.log(resp);
          localStorage.setItem('token', resp.token);
          this.token = resp.token;
          this.router.navigateByUrl('/menu');
        },
        error: (err) => {
          console.log(err);
          let errorResponse: AuthError = err.error;
          this.toastr.error(errorResponse.msg, "Error");
          localStorage.clear();
        }
      })
  }
    
}

