import { Component , OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../../../globals';
import { ForumService } from '../../../_services/index';
import { Location } from "@angular/common";


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  forumForm = this.fb.group ({
    testoFC: ['', Validators.required]
  });

  idthread = 0;

  constructor (private fb: FormBuilder, private route: ActivatedRoute, public status: Status, private forumService: ForumService,  private location: Location) { }
  
  ngOnInit (){
    this.idthread = Number(this.route.snapshot.paramMap.get('idx')! );
    //console.log(this.route.snapshot)
  }


  onSubmit() {
    //console.log(this.forumForm.value);

    this.forumService.putreply(this.idthread ,  this.forumForm.value.testoFC).subscribe( (data)=>{
      this.location.back();
    });
  
  }

  goback(){
    this.location.back();
  }
}
