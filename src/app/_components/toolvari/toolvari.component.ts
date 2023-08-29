import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/readmeteo.php')
    .subscribe ( (data: any) => {

      this.temperatura=data.temp;
      this.meteo=data.main2;
      this.icon=data.icon;
      this.sunrise = data.sunrise;
      this.sunset = data.sunset;

      console.log(data);

    });

  }

}
