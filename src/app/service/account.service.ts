import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register.model';
import { environment } from '../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class AccountService {
    constructor(private http:HttpClient) { }
    register(model:Register){
        
        return this.http.post(`${environment.apiUrl}Account/register`,model);
    }
    
}