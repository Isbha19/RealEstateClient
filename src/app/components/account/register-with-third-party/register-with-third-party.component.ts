import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../service/account.service';
import { take } from 'rxjs';
import { User } from '../../../model/account/user';
import { RegisterWithExternal } from '../../../model/account/registerWithExternal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-with-third-party',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-with-third-party.component.html',
  styleUrl: './register-with-third-party.component.scss'
})
export class RegisterWithThirdPartyComponent {
  registerForm:FormGroup=new FormGroup({});
  submitted=false;
  provider:string|null=null;
  access_token:string|null=null;
  userId:string|null=null;
  
constructor( private formBuilder: FormBuilder,
  private accountService: AccountService,
  private router:Router,
private activatedRoute:ActivatedRoute,
private toastr:ToastrService){

}
ngOnInit(): void {
this.accountService.user$.pipe(take(1)).subscribe({
  next:(user:User | null)=>{
    if(user){
      this.router.navigateByUrl('/');
    }else{
      this.activatedRoute.queryParamMap.subscribe({
        next:(params:any)=>{
          this.provider=this.activatedRoute.snapshot.paramMap.get('provider');
          this.access_token=params.get('access_token');
          this.userId=params.get('userId');
          console.log(this.provider);
        if(this.provider&&this.access_token &&this.userId && (this.provider==='facebook'||this.provider==='google')){
this.initializeForm();
        }else{
          this.router.navigateByUrl('/')
        }
          
          
        }
      })
    }
  }
})
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
    ]
  });
}

register(){
  this.submitted=true;
  if(this.registerForm.valid && this.userId&&this.access_token&&this.provider){
    const firstName=this.registerForm.get('firstName')?.value;
    const lastName=this.registerForm.get('lastName')?.value;
    const model=new RegisterWithExternal(firstName,lastName,this.userId,this.access_token,this.provider);
    this.accountService.registerWithThirdParty(model).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.router.navigateByUrl('/');
    },
    error: (error) => {
      console.log(error);
      
      const errorMessage = error.error?.message || 'An error occurred';
      this.toastr.error(errorMessage);
    },
    })

  }
}
}
