import { Component, OnInit} from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { ModalService } from '../../_services/index';
import { MessaggiService, Messaggiclan } from '../../_services/index';
import { UnContatto,  Status } from '../../globals';
import { AnagrafeRow, AnagrafeService } from '../../_services/index';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';




@Component({
  selector: 'app-messaggi',
  templateUrl: './messaggi.component.html',
  styleUrls: ['./messaggi.component.css']
})
export class MessaggiComponent implements OnInit {

  listacont: Array<UnContatto>;
  anagrafe: Array<AnagrafeRow> = [];

  filteredOptions: Observable<AnagrafeRow[]>;
  


  myMsgClan = new  Messaggiclan();

  myFormGroup: FormGroup;


  constructor( private messaggiService: MessaggiService, public status: Status, private modalService: ModalService, private anagrafeservice: AnagrafeService ) { }

  ngOnInit(): void {


    this.myFormGroup = new FormGroup({
      myFormControl: new FormControl('')
    });




    this.messaggiService.getcontatti(this.status.Userid)
    .subscribe( (data) => {
      //console.log (data);
      this.status.myContatti = data;
      this.caricaanagrafica();

    });

    this.messaggiService.contamessaggiclan()
    .subscribe((data: any) => {
      this.myMsgClan = data ;

    });

  }

  caricaanagrafica(){

    this.anagrafeservice.anagrafe()
    .subscribe( (data: any) => {
      this.anagrafe = data;

      
      for (let i = 0; i < this.anagrafe.length; i++) {
        if (this.anagrafe[i].Userid === this.status.Userid) {
          this.anagrafe.splice(i--, 1);
        }
      }

      // rimuovo i contatti già presenti //
      for ( let j = 0 ; j < this.status.myContatti.length ; j ++ ) {
        for (let i = 0; i < this.anagrafe.length; i++) {
          if (this.anagrafe[i].Userid === this.status.myContatti[j].IDX) {
            this.anagrafe.splice(i--, 1);
          }
        }
      }

      // forzo nome = nome + cognome
      for (let i = 0; i < this.anagrafe.length; i++) {
        this.anagrafe[i].Nome = this.anagrafe[i].Nome + ' ' + this.anagrafe[i].Cognome;
      }

      this.filteredOptions = this.myFormGroup.get('myFormControl').valueChanges.pipe(
        startWith(''),
        map(value => this.myfilter(value || '' )),
      );

    });

  }

  showmsg(IDX: number, nome: string, url: string){
    this.status.contattoID = IDX ;
    this.status.contattonome = nome ;
    this.status.contattourl = url ;
    this.status.listamsgon = true ;

    for ( var j = 0 ; j< this.status.myContatti.length ; j++) {
      if ( this.status.myContatti[j].IDX == this.status.contattoID ) {
        this.status.myContatti[j].Nuovi = 0 ;
      }
    }

    this.myFormGroup.reset();
    this.modalService.show('modallistamsg') ;

  }

  showmsgclan(IDX: number, nome: string, url: string){
    this.status.clancontattoID = IDX ;
    this.status.clancontattonome = nome ;
    this.status.clancontattourl = url ;
    this.status.listamsgclanon = true ;

    this.myMsgClan.numero = 0;


    this.modalService.show('modallistamsgclan') ;

  }


  displayFn  (user: AnagrafeRow) :string {
    return user && user ? user.Nome : '';
  }

  myfilter(obj: string): AnagrafeRow[] {


    if ( typeof obj != "string" ) return;
    // console.log("in myfilter :" , obj);

    const filterValue = obj.toLowerCase();

    return this.anagrafe.filter(option => option.Nome.toLowerCase().includes(filterValue));
  }

  onSelectionChanged(event: any) {

    const selected = this.myFormGroup.value.myFormControl;
    // console.log(selected.Userid, selected.Nome, selected.URLImg);
    this.showmsg(selected.Userid, selected.Nome, selected.URLImg);
  }






}
