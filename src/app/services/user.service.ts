import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService {

    public url: string;
    public token;
    public identity;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    register(user): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signup(user, getToken = null): Observable<any> {
        if (getToken != null) {
            user.getToken = 'true';
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    update(token, user): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
        return this._http.put(this.url + 'update', params, { headers: headers });
    }

    getUser(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'user/' + id, { headers: headers });
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token && token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }
}