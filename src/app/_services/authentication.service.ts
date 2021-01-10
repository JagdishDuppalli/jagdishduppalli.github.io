import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.get<any>(`http://www.reyocto.info/reyocto/log/` + username + `/` + password)
            .pipe(map(user => {
                if (user[0] && user[0].Client_ID > 0) { //&& user.token
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user[0]));
                    return true;
                }
                else
                    return false;


            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}