import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from '../../Servicios/api/api.service';
import { LoginI } from '../../Modelos/login.interface';
import { ResponseI } from '../../Modelos/response.interface';

import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm = new FormGroup({
    email : new FormControl('test1@idat.com', Validators.required),
    password: new FormControl('test', Validators.required)
  })

  constructor( private api:ApiService, private router:Router ){

  }

  ngOnInit(): void {
  }

  onLogin(form:  any){
     this.api.loginByEmail(form.value)
     .subscribe({
      next: data => {
        let dataResponse: ResponseI = data;
        console.log(data)
        localStorage.setItem("token", dataResponse.token);
        this.router.navigate(['menu'])
      },
      error: error => {
        const failed = error.error;
        console.error('There was an error!');
        console.log(failed);
      }
     })
  //console.log(form.value)
  // this.api.loginByEmail(form).subscribe(data =>{
  //   let dataResponse:ResponseI = data;
  //   if(dataResponse.status == "ok"){
  //     localStorage.setItem("token",dataResponse.result.token);
  //     this.router.navigate(['menu'])
  //   }
  // })

    // let dataResponse:ResponseI = form;
    // if(dataResponse.status == "ok"){
    //   localStorage.setItem("token", dataResponse.result.token);
    //   this.router.navigate(['menu'])
    // }

 }

}
