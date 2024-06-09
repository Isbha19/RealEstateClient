import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
constructor(private dialogref:MatDialogRef<RegisterComponent>,private formBuilder:FormBuilder){
}
data = inject(MAT_DIALOG_DATA);
title=this.data.title;
}
