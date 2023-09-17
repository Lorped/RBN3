import { Component,  ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService, Forumthread } from  '../../../_services/index';


import { MatTableDataSource  } from '@angular/material/table';
import { Status } from '../../../globals';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent {

  displayedColumns: string[] = ['IDmessaggio'];
  dataSource: MatTableDataSource<Forumthread> ;
  fulldata: Array<Forumthread> = [];
  Nomebacheca = '';
  Nomemessaggio = '';
  Chiuso = 0;
  Pinned = 0 ;

  id = 0;
 


  constructor(private route: ActivatedRoute, private forumService: ForumService, public status:Status){}

  ngAfterViewInit() {
    this.id = Number(this.route.snapshot.paramMap.get('idx')! );

    //console.log(this.id);

    this.forumService.getforumthread(this.id)
    .subscribe( (data) => {
      //console.log(data);
     
      this.Nomebacheca = data.NomeB;
      this.Nomemessaggio = data.NomeM;
      this.Chiuso=data.content[0].Chiuso;
      this.Pinned=data.content[0].Pinned;
      this.fulldata = data.content;
      this.dataSource = new MatTableDataSource(data.content);
      //console.log(this.dataSource);

    });
    
  }

  onofflock(){
   
    this.forumService.lockunlockthread(this.id).subscribe((data)=>{
      this.Chiuso == 1 ? this.Chiuso=0 : this.Chiuso = 1;
    });
  }
  onoffpin(){
   
    this.forumService.pinunpinthread(this.id).subscribe((data)=>{
      this.Pinned == 1 ? this.Pinned=0 : this.Pinned = 1;
    });
  }



}
