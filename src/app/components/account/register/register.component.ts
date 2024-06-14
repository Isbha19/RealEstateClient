import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../service/account.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../account/login/login.component';
import { ValidationMessagesComponent } from '../../errors/validation-messages/validation-messages.component';
import { Router } from '@angular/router';
declare const FB:any;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,ValidationMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private dialog: MatDialog,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern("^[-'a-zA-Z]+$"),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern("^[-'a-zA-Z]+$"),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "^[A-Za-z0-9!#%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$"
          ),
        ],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }
  register() {
    this.submitted = true;
    this.errorMessages = [];
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: (response:any) => {
            this.toastr.success(response.message);
            this.dialogRef.close();
            this.dialog.open(LoginComponent, { width: '60%' });        
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'An error occurred';
          this.toastr.error(errorMessage);
        },
      });
    }
  }
  registerWithFacebook(){
FB.login(async(fbResult:any)=>{
if(fbResult.authResponse){
const accessToken=fbResult.authResponse.accessToken;
const userId=fbResult.authResponse.userID;
this.dialogRef.close();

this.router.navigateByUrl(`/register/third-party/facebook?access_token=${accessToken}&userId=${userId}`);

}else{
  this.toastr.error("Unable to register with your facebook")
}
})
  }
  registerWithGoogle(){

  }
}
