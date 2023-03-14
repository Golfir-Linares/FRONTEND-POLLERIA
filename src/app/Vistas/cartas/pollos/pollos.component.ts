import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { PolloService } from 'src/app/Servicios/carta/pollo.service';

@Component({
  selector: 'app-pollos',
  templateUrl: './pollos.component.html',
  styleUrls: ['./pollos.component.css']
})
export class PollosComponent implements OnInit {
  pollo:CartaI []=[];

  constructor(private api:PolloService, private router:Router){}

  ngOnInit(): void {
    this.api.getAllPollo()
    .subscribe(rs => {
      console.log(rs);
      this.pollo=rs
    })
  }

}
