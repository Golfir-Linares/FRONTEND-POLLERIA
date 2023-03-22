import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Servicios/api/api.service';
import { SignupInterface, DocumentType } from 'src/app/Modelos/auth.interface';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {

  documents: DocumentType[]=[];

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

  ngOnInit(): void {
    //this.getDocument(this.user_token);
  }

  register(){
    const { name, lastname, email, documentType, documentNumber, password } = this.registerForm.value;
    let url_confirmación = "";
    this.api.register(name, lastname, email, documentType, documentNumber, password)
      .subscribe({
        next: (resp: SignupInterface) => {
          localStorage.setItem('user_token', resp.token);
          this.user_token = resp.token;
          url_confirmación = "http://localhost:4200/confirm/"+this.user_token;
          this.api.sendMail(email, "Confirmación de usuario:", "Está a solo un paso de confirmar su cuenta", url_confirmación).subscribe();
          this.toastr.success(resp.msg, "Success");
        },
        error: (err) => {
          let errorResponse: SignupInterface = err.error;
          this.toastr.error(errorResponse.msg, "Error");
          console.log(errorResponse.msg)
          localStorage.clear();
        }
      })
  }

  getDocument(token: string){
    this.api.getDocument(token)
    .subscribe({
      next:(data)=>{
        this.documents=data
        console.log(data)
      }
    })
  }


}
