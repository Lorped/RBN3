import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registra5',
  templateUrl: './registra5.component.html',
  styleUrls: ['./registra5.component.css']
})
export class Registra5Component implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.removeItem('RBN3registration1');
    sessionStorage.removeItem('RBN3registration2');
    sessionStorage.removeItem('RBN3registration3');
    sessionStorage.removeItem('RBN3registration4');
  }

}
