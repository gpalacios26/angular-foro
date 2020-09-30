import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class CommentService {

    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    addComment(token, topicId, comment): Observable<any> {
        let params = JSON.stringify(comment);
        let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
        return this._http.post(this.url + 'comment/topic/' + topicId, params, { headers: headers });
    }

    deleteComment(token, topicId, commentId): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
        return this._http.delete(this.url + 'comment/' + topicId + '/' + commentId, { headers: headers });
    }
}