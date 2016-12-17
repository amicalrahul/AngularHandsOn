﻿import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/schoolapp/services/data.service';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    templateUrl: '../../app/schoolapp/allClassrooms.component.html'

})
export class AllClassroomComponent implements OnInit {
    classroomteacher: string;
    classroomname: string;
    school: string = "default";
    schools: ISchool[];
    allClassrooms: IClassroom[];
    errorMessage: string;
    isschoolvalid: boolean;
    constructor(private _dataService: DataService) {
    }

    ngOnInit(): void {

        this._dataService.getAllSchools()
            .subscribe(schools => {
                this.schools = schools;
            },
            error => this.errorMessage = <any>error);


        this._dataService.getAllClassrooms()
            .subscribe(classrooms => {
                console.log(classrooms);
                this.allClassrooms = classrooms;
            },
            error => this.errorMessage = <any>error);

    }
    addClassroom() {
        this._dataService.addClassroom({
            name: this.classroomname,
            teacher: this.classroomteacher,
            school_id: this.school
        }).subscribe(data => {
            this.allClassrooms = data;
            this.school = 'default';
            this.classroomname = null;
            this.classroomteacher = null;
        }
            );
    }
    validateschoolname(school: string) {
        if (school == 'default')
            this.isschoolvalid = false;
        else
            this.isschoolvalid = true;
    }
    
}