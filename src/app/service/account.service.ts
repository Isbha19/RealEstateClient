import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register.model';
import { environment } from '../../environments/environment.development';
import { Login } from '../model/login.model';
import { User } from '../model/user';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AccountService {
    private userSource=new ReplaySubject<User|null>(1);
    user$=this.userSource.asObservable();
    constructor(private http:HttpClient,
        private router:Router
    ) { }


    refreshUser(jwt: string | null) {
        if (jwt === null) {
          this.userSource.next(null);
          return of(undefined);
        }
        
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + jwt);
        
        return this.http.get<User>(`${environment.apiUrl}account/refresh-user-token`, { headers }).pipe(
          map((user: User) => {
            this.setUser(user);
          })
        );
      }
    login(model:Login){
        return this.http.post<User>(`${environment.apiUrl}Account/login`,model).pipe(
            map((user:User)=>{
                if(user){
                    this.setUser(user)
                    return user;
                }
                return null;
            })
        );

    }
    register(model:Register){
        
        return this.http.post(`${environment.apiUrl}Account/register`,model);
    }
    logout(){
        localStorage.removeItem(environment.userKey);
        this.userSource.next(null);
        this.router.navigateByUrl('/');
        
    }
    private setUser(user:User){
        localStorage.setItem(environment.userKey,JSON.stringify(user));
        this.userSource.next(user);
      
    }
    getjwt(){
        const key=localStorage.getItem(environment.userKey);

        
        if(key){
            const user=JSON.parse(key);
            return user.token;
        }else{
            return null;
        }
    }
}