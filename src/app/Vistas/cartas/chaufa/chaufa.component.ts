import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { ChaufasService } from 'src/app/Servicios/carta/chaufas.service';

@Component({
  selector: 'app-chaufa',
  templateUrl: './chaufa.component.html',
  styleUrls: ['./chaufa.component.css']
})
export class ChaufaComponent implements OnInit {
  chaufa:CartaI []=[];

  constructor(private api:ChaufasService, private router:Router){}

  ngOnInit(): void {
    this.api.getAllChaufa()
    .subscribe(rs =>{
      console.log(rs);
      this.chaufa=rs
    })
  }

}
