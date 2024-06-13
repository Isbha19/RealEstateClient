import { Login } from './../../../model/account/login.model';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../../errors/validation-messages/validation-messages.component';
import { AccountService } from '../../../service/account.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SendEmailComponent } from '../send-email/send-email.component';
import { LoginWithExternal } from '../../../model/account/loginWithExternal';
declare const FB: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationMessagesComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  submitted: boolean = false;
  resendEmail = false;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message);
          this.dialogRef.close();
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'An error occurred';
          if (errorMessage.includes('please confirm your email')) {
            this.resendEmail = true;
          }
          this.toastr.error(errorMessage);
        },
      });
    }
  }
  OpenSendEmailPopUp() {
    this.dialog.open(SendEmailComponent, {
      width: '40%',
      data: {
        mode: 'resend-email-confirmation-link',
      },
    });
  }
  resendEmailConfirmationLink() {
    this.OpenSendEmailPopUp();
  }
  OpenPopUp() {
    this.dialog.open(SendEmailComponent, {
      width: '30%',
      data: {
        mode: 'forgot-username-or-password',
      },
    });
  }
  loginWithFacebook() {
    FB.login(async (fbResult: any) => {
      if (fbResult.authResponse) {
        const accessToken = fbResult.authResponse.accessToken;
        const userId = fbResult.authResponse.userID;
        console.log(fbResult);
        
        this.dialogRef.close();
        this.accountService
          .loginWithThirdParty(
            new LoginWithExternal(accessToken, userId, 'facebook')
          )
          .subscribe({
            next: (_) => {
          this.dialogRef.close();
          this.router.navigateByUrl('/');
            },
            error:error=>{
              const errorMessage = error.error?.message || 'An error occurred';
              this.toastr.error(errorMessage);
            }
          });
      } else {
        this.toastr.error('Unable to login with your facebook');
      }
    });
  }
  loginWithGoogle() {}
}
