import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/Servicios/api/api.service';
import { ConfirmResponse } from 'src/app/Modelos/auth.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  user_token: any;
  error_msg = "";
  resp_msg = "";

  constructor(private route: ActivatedRoute, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user_token = this.route.snapshot.paramMap.get('user_token');
    localStorage.setItem('user_token', this.user_token);
    console.log(this.user_token);

    this.confirmarRegistro();
  }

  confirmarRegistro() {
    this.api.confirmUser(this.user_token).subscribe({
      next: (resp: ConfirmResponse) => {
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
