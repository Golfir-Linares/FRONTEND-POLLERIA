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
    console.log(this.miForm.value);
    const { email } = this.miForm.value;
    //localStorage.setItem('auto_email', email);
    this.api.recoverUser(email)
      .subscribe({
        next: (resp: ForgetPassResponse) => {
          console.log(resp);
          console.log(resp.data);
          
          localStorage.setItem('token', resp.data);
          localStorage.setItem('user_token', resp.data);
          localStorage.setItem('new_user_token', resp.data);
          this.token = resp.data;
          let url_confirmación = "http://localhost:4200/verify/"+this.token;
          console.log(url_confirmación);
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
