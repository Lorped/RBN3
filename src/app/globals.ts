import { Injectable } from '@angular/core';


@Injectable()
export class Background {
  public IDbackground: number;
  public NomeBackground: string;
  public LivelloBG: number;
  constructor () {}
}

@Injectable()
export class Attributo {
  public IDattributo: number;
  public NomeAttributo: string;
  public Tipologia: string;
  public Livello: number;
  constructor () {}
}

@Injectable()
export class Skill {
  public IDskill: number;
  public NomeSkill: string;
  public Tipologia: string;
  public Livello: number;
  constructor () {}
}

@Injectable()
export class Disciplina {
  public IDdisciplina: number;
  public NomeDisc: string;
  public LivelloDisc: number;
  constructor () {}
}


@Injectable()
export class Personaggio {

    public Userid: number;
    public Nome: string;
    public Cognome: string;
    public Email: string;
    public Pass: string;
    public DataIscrizione: string;
    public Esperienza: number;
    public IDNatura: number;
    public Natura: string;  //from LEFT Join
    public IDCarattere: number;
    public Carattere: string; //from LEFT Join
    public IDrazza: number;
    public IDclan: number;
    public Clan: string; //from LEFT Join
    public Sesso: string;
    public Eta: number;
    public EtaA: number;
    public Generazione: number;
    public PS: number;
    public PSmax: number;
    public FdV: number;
    public FdVmax: number;
    public IDsentiero: number;
    public Valsentiero: number;
    public DescSentiero: string; //from LEFT Join
    public Coscienza: number;
    public Coraggio: number;
    public SelfControl: number;
    public IDsalute: number ;
    public daurto: number;
    public aggravati: number;
    public URLImg: string;
    public Background: string;
    public Annotazioni: string;
    public Soldi: number;

    public listaAttributo: Array<Attributo>;
    public listaSkill: Array<Skill>;
    public listaBackground: Array<Background> ;

    constructor () {}
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
}
