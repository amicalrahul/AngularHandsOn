import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ISchool } from '../../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../../app/schoolapp/interfaces/activity';


@Injectable()
export class DataService {

    constructor(private _http: Http) { }
    schoolsUrl: string = '/api/home1/Schools/';
    classroomssUrl: string = '/api/home1/Classrooms/';
    activitiesUrl: string = '/api/home1/Activities/';
    getAllObjectCountUrl: string = '/api/home1/GetAllObjectsCount/';

    getAllSchools(): Observable<ISchool[]> {
        return this._http.get(this.schoolsUrl)
            .map(this.mapSchoolResponse)
            .do(data => console.log('GetSchools: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getAllClassrooms(): Observable<IClassroom[]> {
        return this._http.get(this.classroomssUrl)
            .map(this.mapClassroomResponse)
            .do(data => console.log('GetClassrooms: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getClassroom(id: number): Observable<IClassroom> {
        return this._http.get(this.classroomssUrl + id)
            .map((response: Response) => (<IClassroom>response.json()))
            .do(data => console.log('GetClassroomByID: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getClassroombyname(name: string): Observable<IClassroom[]> {
        return this._http.get(this.classroomssUrl + '?name=' + name)
            .map((response: Response) => (<IClassroom[]>response.json()))
            .do(data => console.log('GetClassroomByName: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllActivities(): Observable<IActivity[]> {
        return this._http.get(this.activitiesUrl)
            .map(this.mapActivityResponse)
            .do(data => console.log('GetActivities: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllObjectsCount(): Observable<any> {
        return this._http.get(this.getAllObjectCountUrl)
            .map((response: Response) => response.json())
            .do(data => console.log('GetAllObjectsCount: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    getAllObjectsCountUsingForkJoin(): Observable<any> {
        return Observable.forkJoin(
            this._http.get(this.schoolsUrl).map((res: Response) => res.json()),
            this._http.get(this.classroomssUrl).map((res: Response) => res.json()),
            this._http.get(this.activitiesUrl).map((res: Response) => res.json())
        );
    }
    addActivity(body: Object): Observable<IActivity[]> {
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.post(this.activitiesUrl, JSON.stringify(body), options)
            .map(this.mapActivityResponse)
            .catch(this.handleError);
    }

    addClassroom(body: Object): Observable<IClassroom[]> {
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.post(this.classroomssUrl, JSON.stringify(body), options)
            .map(this.mapClassroomResponse)
            .catch(this.handleError);
    }

    addSchool(body: Object): Observable<ISchool[]> {
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.post(this.schoolsUrl, JSON.stringify(body), options)
            .map(this.mapSchoolResponse)
            .catch(this.handleError);
    }
    updateSchool(body: ISchool): Observable<ISchool[]> {
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.put(`${this.schoolsUrl}${body['id']}`, JSON.stringify(body), options)
            .map(this.mapSchoolResponse)
            .catch(this.handleError);
    }
    deleteSchool(id: string): Observable<ISchool[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.delete(`${this.schoolsUrl}${id}`, options)
            .map(this.mapSchoolResponse)
            .catch(this.handleError);
    }
    getMonthName(month: number) {
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1];
    }
    private getItemsById: any = function (data: any[], id: any) {

        let matchingItems = data.filter(function (item) {
            return item.id === id;
        });
        return matchingItems;
    };
    private mapActivityResponse(response: Response) {
        return <IActivity[]>response.json();
    }
    private mapSchoolResponse(response: Response) {
        return <ISchool[]>response.json();
    }
    private mapClassroomResponse(response: Response) {
        return <IClassroom[]>response.json();
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
