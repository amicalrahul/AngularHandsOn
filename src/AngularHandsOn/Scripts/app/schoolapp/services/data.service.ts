import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { ISchool } from '../../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../../app/schoolapp/interfaces/activity';


@Injectable()
export class DataService {

    constructor(private _http: Http) { }
    getSchoolsUrl: string = "/api/home1/GetSchools/";
    getClassroomssUrl: string = "/api/home1/GetClassrooms/";
    getActivitiesUrl: string = "/api/home1/GetActivities/";
    getClassroomUrl: string = "/api/home1/GetClassroom/";
    getAllObjectCountUrl: string = "/api/home1/GetAllObjectsCount/";

    getAllSchools(): Observable<ISchool[]> {
        return this._http.get(this.getSchoolsUrl)
            .map((response: Response) => <ISchool[]>response.json())
            .do(data => console.log('GetSchools: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }
    getAllClassrooms(): Observable<IClassroom[]> {
        return this._http.get(this.getClassroomssUrl)
            .map((response: Response) => <IClassroom[]>response.json())
            .do(data => console.log('GetClassrooms: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }
    getClassroom(id: number): Observable<IClassroom> {
        return this._http.get(this.getClassroomUrl + id)
            .map((response: Response) => (<IClassroom>response.json()))
            .do(data => console.log('GetClassroom: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }

    getAllActivities(): Observable<IActivity[]> {
        return this._http.get(this.getActivitiesUrl)
            .map((response: Response) => <IActivity[]>response.json())
            .do(data => console.log('GetActivities: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }

    getAllObjectsCount(): Observable<any> {
        return this._http.get(this.getAllObjectCountUrl)
            .map((response: Response) => response.json())
            .do(data => console.log('GetAllObjectsCount: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }
    getAllObjectsCountUsingForkJoin(): Observable<any> {
        return Observable.forkJoin(
            this._http.get(this.getSchoolsUrl).map((res: Response) => res.json()),
            this._http.get(this.getClassroomssUrl).map((res: Response) => res.json()),
            this._http.get(this.getActivitiesUrl).map((res: Response) => res.json())
        );
    }

    private getItemsById: any = function (data: any[], id: any) {

        var matchingItems = data.filter(function (item) {
            return item.id == id;
        });
        return matchingItems;
    };
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
