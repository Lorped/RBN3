import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { SignupService } from '../../../_services/signup.service';

@Component({
  selector: 'app-registra0',
  templateUrl: './registra0.component.html',
  styleUrls: ['./registra0.component.css']
})
export class Registra0Component implements OnInit {

  accetta = '';

  registrationForm: FormGroup;


  constructor( private signupService: SignupService , private router: Router  ) { }

  ngOnInit() {


    this.registrationForm = new FormGroup ({
      regemail: new FormControl('', [
        Validators.required,
        Validators.email
      ], [
        this.validateEmailNotTaken.bind(this)
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^.*((\\d.*[a-zA-Z])|([a-zA-Z].*\\d)).*$')
      ]),

      password2: new FormControl('', [
        Validators.required
      ]),

      check: new FormControl('', [
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
    return this.signupService.checkEmail(control.value).pipe(
    map(res => {
      return res === 'OK' ? null : { emailTaken: true };
    }));
  }

  goto1() {
    const myobj = {
      'regemail': this.regemail.value,
      'passwd': this.password.value
    };
    sessionStorage.setItem('RBN3registration0', JSON.stringify(myobj) );
    this.router.navigate(['/registra/1']);
  }

}
