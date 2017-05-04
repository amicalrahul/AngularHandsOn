import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../app/schoolapp/services/data.service';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    selector: 'pm-school',
    templateUrl: '../../app/schoolapp/home.component.html'

})
export class HomeComponent implements OnInit {
    message: string = 'School App';
    allSchools: ISchool[];
    allClassrooms: IClassroom[];
    allActivities: IActivity[];
    errorMessage: string;
    schoolCount: number = 0;
    classroomCount: number = 0;
    activityCount: number = 0;

    constructor(private _dataService: DataService, private _router: Router) {
    }

    ngOnInit(): void {
        this._dataService.getAllObjectsCount()
            .subscribe(products => {
                this.schoolCount = products.schoolCount;
                this.activityCount = products.activityCount;
                this.classroomCount = products.classroomCount;
            },
            error => this.errorMessage = <any>error);
    }    

    refresh(): void {
        this._router.navigate(['/schoolapphome']);
    }
}
