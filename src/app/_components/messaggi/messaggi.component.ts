import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../_services/index';
import { MessaggiService } from '../../_services/index';
import { UnContatto,  Status } from '../../globals';
import { AnagrafeRow, AnagrafeService } from '../../_services/index';



import { FormControl,  Validators, AbstractControl } from '@angular/forms';



@Component({
  selector: 'app-messaggi',
  templateUrl: './messaggi.component.html',
  styleUrls: ['./messaggi.component.css']
})
export class MessaggiComponent implements OnInit {

  listacont: Array<UnContatto>;
  anagrafe: Array<AnagrafeRow> = [];
  myControl: FormControl;

  xx="ciao";


  constructor( private messaggiService: MessaggiService, public status: Status, private modalService: ModalService, private anagrafeservice: AnagrafeService ) { }

  ngOnInit(): void {


    this.myControl = new FormControl('');
   

    this.messaggiService.getcontatti(this.status.Userid)
    .subscribe( (data) => {
      //console.log (data);
      this.status.myContatti = data;


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


        console.log(this.anagrafe);

      });
  


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

    this.modalService.show('modallistamsg') ;

  }


  displayFn(user: AnagrafeRow): string {
    return user && user.Nome ? user.Nome : '';
  }

  private _filter(name: string): AnagrafeRow[] {
    const filterValue = name.toLowerCase();

    return this.anagrafe.filter(option => option.Nome.toLowerCase().includes(filterValue));
  }

}
