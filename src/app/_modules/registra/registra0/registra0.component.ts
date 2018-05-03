import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registra0',
  templateUrl: './registra0.component.html',
  styleUrls: ['./registra0.component.css']
})
export class Registra0Component implements OnInit {

  registrazione = {
    email: '',
    passwd: '',
    passwd2: ''
  }

  constructor() { }

  ngOnInit() {
  }

}
