import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../Servicios/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetPassResponse } from 'src/app/Modelos/auth.interface';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

  token: string = "";
  miForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}

  recoverUser(){
    const { email } = this.miForm.value;
    this.api.recoverUser(email)
      .subscribe({
        next: (resp: ForgetPassResponse) => {
          localStorage.setItem('token', resp.data);
          localStorage.setItem('user_token', resp.data);
          localStorage.setItem('new_user_token', resp.data);
          this.token = resp.data;
          let url_confirmación = "http://localhost:4200/verify/"+this.token;
          this.api.sendMail(email, "Cambiar contraseña:", "Está a un paso de poder cambiar su contraseña", url_confirmación).subscribe();
          this.toastr.success(resp.msg, "Success");
        },
        error: (err) => {
          console.log(err);
          let errorResponse: ForgetPassResponse = err.error;
          this.toastr.error(errorResponse.msg, "Error");
          localStorage.clear();
        }
      })
  }

}
