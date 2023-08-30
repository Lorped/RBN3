import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Status } from '../../globals';
import { MessaggiService, ListpresentiService } from '../../_services/index';

@Component({
  selector: 'app-toolvari',
  templateUrl: './toolvari.component.html',
  styleUrls: ['./toolvari.component.css']
})
export class ToolvariComponent implements OnInit {

  
  temperatura = 18;
  meteo = "Sereno";
  icon = '01d'; // sereno
  sunrise = '06:00';
  sunset = '18:00';
  description = "Sereno";

  nummsg = 0 ;
  hidden = true;

  ingame = "In Game";
  checked: boolean;

  constructor(private http: HttpClient, private status: Status, private messaggiService: MessaggiService, private listpresentiService: ListpresentiService) { }

  ngOnInit(): void {

    this.reloadmeteo();

    IntervalObservable.create(3600000)
    .subscribe( () => {
      this.reloadmeteo();
    });


    this.messaggiService.contanuovimessaggi(this.status.Userid)
    .subscribe( (data) => {
  
      //console.log(data);
      this.nummsg = data.Nuovimessaggi;

      this.nummsg == 0 ? this.hidden = true : this.hidden = false;
    });


    IntervalObservable.create(90000)
    .subscribe( () => {
      this.messaggiService.contanuovimessaggi(this.status.Userid)
      .subscribe( (data) => {
        this.nummsg = data.Nuovimessaggi;

        this.nummsg == 0 ? this.hidden = true : this.hidden = false;
      });
  
    });

  }

  reloadmeteo() {

    this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/readmeteo.php')
    .subscribe ( (data: any) => {
      this.temperatura=data.temp;
      this.meteo=data.main2;
      this.icon=data.icon;
      this.sunrise = data.sunrise;
      this.sunset = data.sunset;
      this.description = data.description;
    });  
  }

  onChange(event) {
    this.ingame == "In Game" ? this.ingame = "OFF Game" : this.ingame = "In Game" ;

    this.status.Ongame == 'S' ? this.status.Ongame = 'N' : this.status.Ongame = 'S' ;

    this.listpresentiService.changeonoffgame().subscribe( );

  }

}
