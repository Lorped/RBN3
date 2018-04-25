import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-spesapx',
  templateUrl: './spesapx.component.html',
  styleUrls: ['./spesapx.component.css']
})
export class SpesapxComponent implements OnInit {

  constructor( private location: Location ) { }

  ngOnInit() {
  }

  goback () {
    this.location.back();
  }
}
