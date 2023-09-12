import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Status } from '../../../globals';
import { ForumService, Forumthread } from '../../../_services/index';
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
 
  idy: number;


  constructor (private fb: FormBuilder, private route: ActivatedRoute, public status: Status, private forumService: ForumService,  private location: Location) { }

  ngOnInit (){
    this.idy = Number(this.route.snapshot.paramMap.get('idy')! );
    //console.log(this.route.snapshot)

    this.forumService.getsinglethread(this.idy).subscribe( (data: Forumthread) => { 
      
      console.log(data);
      this.forumForm.patchValue({titoloFC: data.Nome, testoFC: data.Testo});

      console.log(this.forumForm);

      if (data.OP != 0 ) {
        console.log(data.OP);

        this.forumForm.get('titoloFC').clearValidators(); 
        this.forumForm.get('titoloFC').updateValueAndValidity(); 
        this.forumForm.get('titoloFC').disable(); 
      }
      console.log(this.forumForm);
    });
  }



  onSubmit() {
    //console.log(this.forumForm.value);

    
    this.forumService.updatethread(this.idy, this.forumForm.value.titoloFC, this.forumForm.value.testoFC).subscribe( (data)=>{
      this.location.back();
    });
    
  
  }

  goback(){
    this.location.back();
  }

}
