import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { ISchool } from '../../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../../app/schoolapp/interfaces/activity';


@Injectable()
export class DataService {

    constructor(private _http: Http) { }

    getAllSchools(): Observable<ISchool[]> {
        let url: string = "/Home/GetSchools";
        return this._http.get(url)
            .map((response: Response) => <ISchool[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }

    getAllClassrooms(): Observable<IClassroom[]> {
        let url: string = "/Home/GetClassrooms";
        return this._http.get(url)
            .map((response: Response) => <IClassroom[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }

    getAllActivities(): Observable<IActivity[]> {
        let url: string = "/Home/GetActivities";
        return this._http.get(url)
            .map((response: Response) => <IActivity[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
