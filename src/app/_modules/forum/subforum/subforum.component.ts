import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ForumService, Forumthread } from '../../../_services/index';
import { MatPaginator  } from '@angular/material/paginator';
import { MatTableDataSource  } from '@angular/material/table';
import { Status } from '../../../globals';

@Component({
  selector: 'app-subforum',
  templateUrl: './subforum.component.html',
  styleUrls: ['./subforum.component.css']
})
export class SubforumComponent implements OnInit{


  
  displayedColumns: string[] = ['IDmessaggio'];
  dataSource: MatTableDataSource<Forumthread> ;
  Nomebacheca = '';
  LivelloPost = 0;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private forumService: ForumService, private router: Router, public status: Status){}

  ngOnInit(): void {  }

  ngAfterViewInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')! );

    this.forumService.getpostforum(id)
    .subscribe( (data) => {
      console.log(data);
      this.Nomebacheca = data.Nome;
      this.LivelloPost = Number(data.LivelloPost);
      this.dataSource = new MatTableDataSource(data.content);
      //console.log(this.dataSource);
      console.log(this.LivelloPost);
      this.dataSource.paginator = this.paginator;
    });
    
  }

  nuovo(){}


}
