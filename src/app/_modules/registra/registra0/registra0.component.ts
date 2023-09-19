import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {ErrorStateMatcher} from '@angular/material/core';

import { Observable, of } from 'rxjs';

import { SignupService } from '../../../_services/signup.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registra0',
  templateUrl: './registra0.component.html',
  styleUrls: ['./registra0.component.css']
})
export class Registra0Component implements OnInit {

  accetta = '';

  registrationForm: UntypedFormGroup;

  matcher = new MyErrorStateMatcher();


  constructor( private signupService: SignupService , private router: Router  ) { }

  ngOnInit() {


    this.registrationForm = new UntypedFormGroup ({
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
      ], [
        this.passworduguali.bind(this)
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
  passworduguali (control: AbstractControl) : Observable<any> {
    const esito = this.password.value == this.password2.value ? null : { pwddiverse: true };
    return of(esito);
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
