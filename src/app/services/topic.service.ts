import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class TopicService {

    public url: string;

    constructor(
        public _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    addTopic(token, topic): Observable<any> {
        let params = JSON.stringify(topic);
        let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
        return this._http.post(this.url + 'topic', params, { headers: headers });
    }

    getTopicsByUser(userId): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'user-topics/' + userId, { headers: headers });
    }

    getTopic(topicId): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'topic/' + topicId, { headers: headers });
    }

    updateTopic(token, topicId, topic): Observable<any> {
        let params = JSON.stringify(topic);
        let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
        return this._http.put(this.url + 'topic/' + topicId, params, { headers: headers });
    }

    deleteTopic(token, topicId): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', token);
        return this._http.delete(this.url + 'topic/' + topicId, { headers: headers });
    }

    getTopics(page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'topics/' + page, { headers: headers });
    }

    search(searchString): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.get(this.url + 'search/' + searchString, { headers: headers });
    }
}