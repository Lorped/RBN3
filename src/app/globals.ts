import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class Personaggio {
  constructor(
    public Userid: number,
    public Nome: string,
    public Cognome: string,
    public Email: string,
    public Pass: string,
    public DataIscrizione: string,
    public Esperienza: number

  ) {  }

}

@Injectable()
export class Status {
  Userid: number = 0;
  Stanza: number = 0 ;
  Offgame: number = 0;
  Last: number = 0;
  Alive: boolean = true;
  Sesso: string = "M";
  MasterAdmin: number = 0;
  menuState:string = 'out';
  CurrentModal: any ;
}
