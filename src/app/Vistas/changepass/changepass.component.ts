import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Servicios/api/api.service';
import { ChangePassResponse, ConfirmResponse, VerifyRecoverTokenResponse } from 'src/app/Modelos/auth.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  new_user_token: any;
  error_msg = "";
  resp_msg = "";
  resp_user = "";

  miForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.new_user_token = this.route.snapshot.paramMap.get('new_user_token');
    localStorage.setItem('token', this.new_user_token);
    localStorage.setItem('user_token', this.new_user_token);
    localStorage.setItem('new_user_token', this.new_user_token);
    console.log(this.new_user_token);

    this.verificarUsuario();
  }

  verificarUsuario() {
    this.api.verifyUser(this.new_user_token).subscribe({
      next: (resp: VerifyRecoverTokenResponse) => {
        this.resp_msg = resp.msg;
        this.resp_user = resp.data.name;
        console.log(resp);
        this.toastr.success(this.resp_msg, "Success");
      },
      error: (err) => {
        console.log(err);
        this.error_msg = err.error.msg;
        this.toastr.error(this.error_msg, "Error");
        localStorage.clear();
      },
    });
  }

  changePass() {
    console.log(this.miForm.value);
    const { password } = this.miForm.value;
    this.api.changePassword(password ,this.new_user_token).subscribe({
      next: (resp: ChangePassResponse) => {
        this.resp_msg = resp.msg;
        console.log(resp);
        this.toastr.success(this.resp_msg, "Success");
      },
      error: (err) => {
        console.log(err);
        this.error_msg = err.error.msg;
        this.toastr.error(this.error_msg, "Error");
        localStorage.clear();
      },
    });
  }


}
