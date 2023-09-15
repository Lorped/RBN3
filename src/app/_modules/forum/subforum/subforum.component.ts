import { Component, OnInit, ViewChild , Injectable} from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { ForumService, Forumthread } from '../../../_services/index';
import { MatPaginator, MatPaginatorIntl  } from '@angular/material/paginator';
import { MatTableDataSource  } from '@angular/material/table';
import { Status } from '../../../globals';
import { Subject } from 'rxjs';



@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  firstPageLabel = 'Prima pagina';
  itemsPerPageLabel = 'Post per pagina';
  lastPageLabel = 'Ultima pagina';



  nextPageLabel = 'Pag. successiva';
  previousPageLabel = 'Pag. precedente';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Pagina 1 di 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return 'Pagina '+ (page + 1) + " di "+amountPages;
  }
}



@Component({
  selector: 'app-subforum',
  templateUrl: './subforum.component.html',
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
  styleUrls: ['./subforum.component.css']
})
export class SubforumComponent implements OnInit{


  pageSize = 5;

  
  displayedColumns: string[] = ['IDmessaggio'];
  dataSource: MatTableDataSource<Forumthread> ;

  LivelloPost = 0;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private forumService: ForumService, private router: Router, public status: Status){}

  ngOnInit(): void { 
    if ( localStorage.getItem('RBN3page') !== undefined && localStorage.getItem('RBN3page') !== '' ) {
      this.pageSize = Number(localStorage.getItem('RBN3page') );
    }
   }

  ngAfterViewInit() {
    const id = Number(this.route.snapshot.paramMap.get('id')! );

    this.forumService.getpostforum(id)
    .subscribe( (data) => {
      //console.log(data);
      this.status.Nomebacheca = data.Nome;
      
      this.LivelloPost = Number(data.LivelloPost);
      this.dataSource = new MatTableDataSource(data.content);
      //console.log(this.dataSource);
      //console.log(this.LivelloPost);
      this.dataSource.paginator = this.paginator;
    });
    
  }

  pagevent( event: any){
    console.log(event);
    if ( this.pageSize != event.PageSize ) {

      localStorage.setItem("RBN3page", event.pageSize.toString());

    }
    
  }

}
