import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Servicios/api/api.service';
import { RegisterData, SignupInterface } from 'src/app/Modelos/auth.interface';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {

  user_token: string = "";

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    documentType: ['', [Validators.required]],
    documentNumber: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toastr: ToastrService) { }

  register(){
    console.log(this.registerForm.value);
    const { name, lastname, email, documentType, documentNumber, password } = this.registerForm.value;
    //console.log(name, lastname, email, documentType, documentNumber, password);
    this.api.register(name, lastname, email, documentType, documentNumber, password)
      .subscribe({
        next: (resp: SignupInterface) => {
          console.log(resp);
          localStorage.setItem('user_token', resp.data.token);
          this.user_token = resp.data.token;
          let url_confirmación = "http://localhost:4200/confirm/"+this.user_token;
          console.log(url_confirmación);
          //this.router.navigateByUrl('/confirm/'+this.user_token);
          this.toastr.success(resp.msg, "Success");
        },
        error: (err) => {
          console.log(err);
          let errorResponse: SignupInterface = err.error;
          this.toastr.error(errorResponse.msg, "Error");
          console.log(errorResponse.msg)
          localStorage.clear();
        }
      })
  }


}
