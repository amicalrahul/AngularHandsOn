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
    message: string = "School App";
    allSchools: ISchool[];
    allClassrooms: IClassroom[];
    allActivities: IActivity[];
    errorMessage: string;
    schoolCount: number;
    classroomCount: number;
    activityCount: number;

    constructor(private _dataService: DataService, private _router: Router) {
    }

    ngOnInit(): void {
        this._dataService.getAllSchools()
            .subscribe(products => {
                this.allSchools = products;
                this.schoolCount = products.length;
            },
            error => this.errorMessage = <any>error);


        this._dataService.getAllClassrooms()
            .subscribe(products => {
                this.allClassrooms = products;
                this.classroomCount = products.length;
            },
            error => this.errorMessage = <any>error);


        this._dataService.getAllActivities()
            .subscribe(products => {
                this.allActivities = products;
                this.activityCount = products.length;
            },
            error => this.errorMessage = <any>error);
    }    

    refresh(): void {
        this._router.navigate(['/schoolapphome']);
    }
}
