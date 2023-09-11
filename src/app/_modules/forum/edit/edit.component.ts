import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../../../globals';
import { ForumService } from '../../../_services/index';
import { Location } from "@angular/common";



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  forumForm = this.fb.group ({
    titoloFC: ['' , Validators.required],
    testoFC: ['', Validators.required]
  });
 
  idsottob: number;

  constructor (private fb: FormBuilder, private route: ActivatedRoute, public status: Status, private forumService: ForumService,  private location: Location) { }

  ngOnInit (){
    this.idsottob = Number(this.route.snapshot.paramMap.get('id')! );
    //console.log(this.route.snapshot)
  }



  onSubmit() {
    console.warn(this.forumForm.value);

    this.forumService.putnewthread(this.idsottob, this.forumForm.value.titoloFC, this.forumForm.value.testoFC).subscribe( (data)=>{
      this.location.back();
    });
  
  }

  goback(){
    this.location.back();
  }

}
