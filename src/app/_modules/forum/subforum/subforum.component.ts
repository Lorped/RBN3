import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ForumService, Forumthread } from '../../../_services/index';
import { MatPaginator  } from '@angular/material/paginator';
import { MatTableDataSource  } from '@angular/material/table';

@Component({
  selector: 'app-subforum',
  templateUrl: './subforum.component.html',
  styleUrls: ['./subforum.component.css']
})
export class SubforumComponent implements OnInit{


  
  displayedColumns: string[] = ['IDmessaggio'];
  dataSource: MatTableDataSource<Forumthread> ;

 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private forumService: ForumService, private router: Router){}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')! );

    this.forumService.getpostforum(id)
    .subscribe( (data) => {
      //console.log(data);
     
      this.dataSource = new MatTableDataSource(data);
      //console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
    
  }



}
