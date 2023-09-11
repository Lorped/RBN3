import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  forumForm: FormGroup;

  constructor () {

    this.forumForm = new FormGroup ({
      titoloFC: new FormControl('', [
        Validators.required
      ]),

      testoFC: new FormControl('', [
        Validators.required
      ]),





    });
  }
}
