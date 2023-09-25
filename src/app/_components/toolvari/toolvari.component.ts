import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Status } from '../../globals';
import { MessaggiService, ListpresentiService } from '../../_services/index';
import { ModalService } from '../../_services/index';

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

  subscription: Subscription; //meteo//
  subscription2: Subscription; //messaggi//

  constructor(private http: HttpClient, public status: Status, private messaggiService: MessaggiService, private listpresentiService: ListpresentiService, private modalService: ModalService) { }

  ngOnInit(): void {

    this.reloadmeteo();

    const source = interval( 3600000);
    this.subscription = source.subscribe ( val => { this.reloadmeteo(); });

    /*
    IntervalObservable.create(3600000)
    .subscribe( () => {
      this.reloadmeteo();
    });
    */


    this.messaggiService.contanuovimessaggi(this.status.Userid)
    .subscribe( (data) => {

      //console.log(data);
      this.status.Newmsg = data.Newmsg;
      //console.log(this.nummsg);
      this.status.Newmsg == 0 ? this.hidden = true : this.hidden = false;
    });


    const source2 = interval( 90000);
    this.subscription2 = source2.subscribe( () => {

      this.messaggiService.contanuovimessaggi(this.status.Userid)
      .subscribe( (data) => {
        this.status.Newmsg = data.Newmsg;
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
    this.ingame === "In Game" ? this.ingame = "OFF Game" : this.ingame = "In Game" ;

    this.status.Ongame === 'S' ? this.status.Ongame = 'N' : this.status.Ongame = 'S' ;

    //console.log(this.status.Ongame);

    this.listpresentiService.changeonoffgame().subscribe( );

  }

  openmsg(){
    //console.log("here");
    this.status.messaggion = true ;
    this.modalService.show('modalmessaggi') ;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
  

}
