import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { SignupService } from '../../../_services/signup.service';

@Component({
  selector: 'app-registra0',
  templateUrl: './registra0.component.html',
  styleUrls: ['./registra0.component.css']
})
export class Registra0Component implements OnInit {

  registrazione = {
    xemail: '',
    passwd: '',
    passwd2: ''
  };

  accetta = '';

  registrationForm: FormGroup;


  constructor( private signupService: SignupService ) { }

  ngOnInit() {


    this.registrationForm = new FormGroup ({
      regemail: new FormControl(this.registrazione.xemail, [
        Validators.required,
        Validators.email
      ], [
        this.validateEmailNotTaken.bind(this)
      ]),

      password: new FormControl(this.registrazione.passwd, [
        Validators.required,
        Validators.minLength(8)
      ]),

      password2: new FormControl(this.registrazione.passwd2, [
        Validators.required
      ]),

      check: new FormControl(this.accetta, [
        Validators.required
      ])
    });
  }

  get regemail() {
      return this.registrationForm.get('regemail');
  }
  get password() {
      return this.registrationForm.get('password');
  }
  get password2() {
      return this.registrationForm.get('password2');
  }
  get check() {
      return this.registrationForm.get('check');
  }

  validateEmailNotTaken(control: AbstractControl) {

    return this.signupService.checkEmail(control.value)
    .map(res => {
      return res=='OK' ? null: { emailTaken: true };
    });

  }

}
