import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  articleForm: FormGroup;

  constructor (private fb: FormBuilder) {

    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',
      body: ''
    });



    // Optional: subscribe to value changes on the form
    // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }
}
