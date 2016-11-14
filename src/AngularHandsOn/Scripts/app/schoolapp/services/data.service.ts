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
        let url: string = "/api/home1/GetSchools";
        return this._http.get(url)
            .map((response: Response) => <ISchool[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }
    getAllClassrooms(): Observable<IClassroom[]> {
        let url: string = "/api/home1/GetClassrooms";
        return this._http.get(url)
            .map((response: Response) => <IClassroom[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }
    getClassroom(id: number): Observable<IClassroom> {
        let url: string = "/api/home1/GetClassroom/" + id;
        return this._http.get(url)
            .map((response: Response) => (<IClassroom>response.json()))
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }
    //getAllClassrooms(): Observable<IClassroom[]> {
    //    let url: string = "/Home/GetClassrooms";
    //    return this._http.get(url)
    //        .map(function (response: Response) {
    //            let classroomsRaw = <IClassroomRaw[]>response.json();
    //            let classrooms: IClassroom[];
    //            let schools: ISchool[] = this.getAllSchools();
    //            classroomsRaw.forEach(function (classroomRaw: IClassroomRaw) {
    //                let classroom: IClassroom;
    //                classroom.id = classroomRaw.id;
    //                classroom.name = classroomRaw.name;
    //                classroom.teacher = classroomRaw.teacher;
    //                classroom.school = this.getItemsById(schools, classroomRaw.school_id)[0];

    //                classrooms.push(classroom);                    
    //            });
    //            return classrooms;
    //        })
    //        .do(data => console.log('All: ' + JSON.stringify(data)))
    //        .catch(this.handleError);;
    //}
    

    private getItemsById: any = function (data: any[], id: any) {

        var matchingItems = data.filter(function (item) {
            return item.id == id;
        });
        return matchingItems;
    };

    getAllActivities(): Observable<IActivity[]> {
        let url: string = "/api/home1/GetActivities";
        return this._http.get(url)
            .map((response: Response) => <IActivity[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }

    getAllObjectsCount(): Observable<any> {
        let url: string = "/api/home1/GetAllObjectsCount";
        return this._http.get(url)
            .map((response: Response) => response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
