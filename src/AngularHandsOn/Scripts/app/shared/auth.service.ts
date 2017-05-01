import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthService {
    authKey = 'auth';
    constructor(private http: Http) {
    }
    login(username: string, password: string): any {
        let url = '/api/auth/token'; // JwtProvider's LoginPath
        let data = {
            UserName: username,
            Password: password,
            client_id: 'OpenGameList',
            // required when signing up with username/password
            grant_type: 'password',
            // space-separated list of scopes for which the token is issued
            scope: 'offline_access profile email'
        };


        // let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        // let options = new RequestOptions({ headers: headers }); // Create a request option

        // return this.http.post(url, JSON.stringify(data), options)
        //    .map(this.mapSchoolResponse)
        //    .catch(this.handleError);

        return this.http.post(
            url,
            JSON.stringify(data),
            new RequestOptions({
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }))
            .map(response => {
                let auth = response.json();
                console.log('The following auth JSON object has been received:');
                console.log(auth);
                this.setAuth(auth);
                return auth;
            });
    }
    logout(): boolean {
        this.setAuth(null);
        return false;
    }
    // Converts a Json object to urlencoded format
    toUrlEncodedString(data: any) {
        let body = '';
        for (let key in data) {
            if (body.length) {
                body += '&';
            }
            body += key + '=';
            body += encodeURIComponent(data[key]);
        }
        return body;
    }
    // Persist auth into localStorage or removes it if a NULL argument is given
    setAuth(auth: any): boolean {
        if (auth) {
            localStorage.setItem(this.authKey, JSON.stringify(auth));
        }
        else {
            localStorage.removeItem(this.authKey);
        }
        return true;
    }
    // Retrieves the auth JSON object (or NULL if none)
    getAuth(): any {
        let i = localStorage.getItem(this.authKey);
        if (i) {
            return JSON.parse(i);
        }
        else {
            return null;
        }
    }
    // Returns TRUE if the user is logged in, FALSE otherwise.
    isLoggedIn(): boolean {
        return localStorage.getItem(this.authKey) != null;
    }
}