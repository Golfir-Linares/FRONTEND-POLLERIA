import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  token: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
    // Leer el valor de la variable "token" desde el localStorage
    this.token = localStorage.getItem('token') ?? '';
  }

  logout() {
    // Eliminar el valor de la variable "token" del localStorage
    localStorage.clear();
  }

}
