import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService, Forumthread } from  '../../../_services/index';

import { MatPaginator  } from '@angular/material/paginator';
import { MatTableDataSource  } from '@angular/material/table';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent {

  displayedColumns: string[] = ['IDmessaggio'];
  dataSource: MatTableDataSource<Forumthread> ;

 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private forumService: ForumService){}

  ngAfterViewInit() {
    const id = Number(this.route.snapshot.paramMap.get('idx')! );

    console.log(id);

    this.forumService.getforumthread(id)
    .subscribe( (data) => {
      console.log(data);
     
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
    
  }

}
