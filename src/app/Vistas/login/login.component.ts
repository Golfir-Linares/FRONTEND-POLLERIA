import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../Servicios/api/api.service';
import { ResponseTrueI } from '../../Modelos/logintrue.interface';
import { ResponseFalseI } from 'src/app/Modelos/loginfalse.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthResponse } from 'src/app/Modelos/auth.interface';


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

  constructor(private fb: FormBuilder ,private api: ApiService, private router: Router, private toastr: ToastrService) {}

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
          this.api.getProfile(this.token)
            .subscribe({
              next: (resp) => {
                // console.log(resp);
                const userRol = resp.roles[0].rol;
                if(userRol === 'user'){
                  this.router.navigateByUrl('/menu');
                }
              },
              error: (err) => {
                console.log(err);
              }
            })
        },
        error: (err) => {
          console.log(err)
          localStorage.clear();
        }
      })
  }
  
  
  
  // onLogin(form: any) {
  //   this.api.loginByEmail(form.value)
  //    .subscribe({
  //     next: data => {
  //       let dataResponse: ResponseTrueI = data;
  //       console.log(data)
  //       localStorage.setItem("token", dataResponse.token);
  //       this.router.navigate(['menu'])
  //     },
  //     error: error => {
  //       const failed = error.error;
  //       let dataResponse: ResponseFalseI = failed;
  //       //console.error('There was an error!');
  //       console.log(dataResponse.msg);
  //       this.toastr.error(dataResponse.msg, "Error");
  //     }
  //    })


    /*console.log(form.value);
    this.api.loginByEmail(form).subscribe((data) => {
      let dataResponse: ResponseI = data;
      if (dataResponse.status == 'ok') {
        localStorage.setItem('token', dataResponse.result.token);
        this.router.navigate(['menu']);
      }
    });

    let dataResponse: ResponseI = form;
    if (dataResponse.status == 'ok') {
      localStorage.setItem('token', dataResponse.result.token);
      this.router.navigate(['menu']);
    }*/


  
}

