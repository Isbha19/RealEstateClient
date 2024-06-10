import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../errors/validation-messages/validation-messages.component';
import { AccountService } from '../../service/account.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ValidationMessagesComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<LoginComponent>
   
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
  login(){
    this.submitted = true;
    this.errorMessages = [];
    if(this.loginForm.valid){
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
      this.toastr.success(response.message);
      this.dialogRef.close();
        },
        error: (error) => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;

            this.toastr.success(this.errorMessages.toString());
          }
        },
      });
    }

  }
}
