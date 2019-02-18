import { Injectable } from '@angular/core';


@Injectable()
export class Background {
  public IDbackground = 0;
  public NomeBackground = '';
  public LivelloBG = 0;
}

@Injectable()
export class Attributo {
  public IDattributo = 0;
  public NomeAttributo = '';
  public Tipologia = '';
  public Livello = 0;
}

@Injectable()
export class Skill {
  public IDskill = 0;
  public NomeSkill = '';
  public Tipologia = '';
  public Livello = 0;
}

@Injectable()
export class Disciplina {
  public IDdisciplina = 0;
  public NomeDisc = '';
  public LivelloDisc = 0;
  public DiClan = '';
}

@Injectable()
export class Basicpg {
  public Userid = 0 ;
  public Nome = '' ;
  public Cognome = '';
  public Email = '';
  public Pass = '';
  public DataIscrizione = '';
  public Esperienza  = 0;
  // public Concetto = '';  // from LEFT Join
  // public Predatore = '';  // from LEFT Join
  // public IDrazza = 0;
  // public IDclan = 0;
  public Clan = ''; // from LEFT Join
  public Sesso = '';
  public Eta = 0;
  public EtaA = 0;
  public Generazione = 0;
  // public PS = 0;  // inutile, andrà eliminato
  // public PSmax = 0; // inutile, andrà eliminato
  public FdV = 0;
  public FdVmax = 0;
  public Valsentiero = 0;
  public DescSentiero = ''; // from LEFT Join
  public IDsalute = 0;
  public daurto = 0;
  public aggravati = 0;
  public URLImg = '';
  public Soldi = 0;
  public MaxStat = 5;
  // public UsoPS = 1;
  // public DescSalute = ''; // from LEFT Join
  // public ModSalute = 0; // from LEFT Join
  public Sete;
  public BloodP = 0;  // from LEFT JOIN da BloodPotency
  public Surge = 0 ;
  public Danni = 0 ;
  public BonusD = 0;
  public Bane = 0 ;
  public MinSete = 0;
  public MinBP = 0 ; // from LEFT JOIN da Generazioni
  public MaxBP = 0 ;
  public Taumaturgo = 0;

}

@Injectable()
export class Personaggio {

  public aPG: Basicpg;

  public listaAttributi: Array<Attributo>;
  public listaSkill: Array<Skill>;
  public listaBackground: Array<Background> ;
  public listaDiscipline: Array<Disciplina> ;


  constructor ( ) {
    this.aPG = new Basicpg ;
    this.listaAttributi = [];
    this.listaSkill = [];
    this.listaBackground = [];
    this.listaDiscipline = [];
  }

}

@Injectable()
export class Concetto {
  IDconcetto = 0;
  Concetto = '';
}

@Injectable()
export class Clan {
  IDclan = 0;
  NomeClan = '';
}

@Injectable()
export class Status {
  Userid = 0;
  Stanza = 0;
  Offgame = 0;
  Last = 0;
  Alive = true;
  Sesso = 'M';
  MasterAdmin = 0;
  menuState = 'out';
  schedaon = false ;
  pxon = false;
  bioon = false;
  anagon = false;
  poterion = false;
  sceltapoterion = false;
  schedaothon = false;
  otherID = 0;
}

@Injectable()
export class Potere {
  IDpotere = 0;
  NomePotere = '';
  NomeDisc = '';
  LivelloPotere = 0;
  DPvariabili = '';
  Costo = 0;
  Target = '';
  DicePool = 0;
}

@Injectable()
export class ListaPoteri {
  public NomeDisc: String;
  public pot: Array<Potere>;

  constructor () {
    this.NomeDisc = '';
    this.pot = [];
  }
}


@Injectable()
export class SceltaPotere {
  IDpotere = 0;
  LivPotere = 0;
  NomePotere = '';
  accessibile = 0;
  bloccato = 0;
  preso = 0;
}

@Injectable()
export class SceltaPotereDisc {
  LivelloDisc = 0;
  NomeDisc = '';
  numpresi = 0;
  pot: Array<Potere> = [];
}
