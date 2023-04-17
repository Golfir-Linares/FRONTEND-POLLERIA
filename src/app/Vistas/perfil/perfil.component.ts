import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileInterface } from 'src/app/Modelos/auth.interface';
import { ApiService } from 'src/app/Servicios/api/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  token: string = '';
  perfil!: ProfileInterface;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';
    this.getPerfil();
  }

  getPerfil() {
    this.api.getProfile(this.token).subscribe({
      next: (resp: ProfileInterface) => {
        this.perfil = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
