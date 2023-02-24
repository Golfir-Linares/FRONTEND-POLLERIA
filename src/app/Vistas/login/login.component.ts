import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../Servicios/api/api.service';
import { ResponseTrueI } from '../../Modelos/logintrue.interface';
import { ResponseFalseI } from 'src/app/Modelos/loginfalse.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private api: ApiService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onLogin(form: any) {
    this.api.loginByEmail(form.value)
     .subscribe({
      next: data => {
        let dataResponse: ResponseTrueI = data;
        console.log(data)
        localStorage.setItem("token", dataResponse.token);
        this.router.navigate(['menu'])
      },
      error: error => {
        const failed = error.error;
        let dataResponse: ResponseFalseI = failed;
        //console.error('There was an error!');
        console.log(dataResponse.msg);
        this.toastr.error(dataResponse.msg, "Error");
      }
     })
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
}
