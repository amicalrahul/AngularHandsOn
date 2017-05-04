import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/schoolapp/services/data.service';
import { NgForm } from '@angular/forms';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    templateUrl: '../../app/schoolapp/allClassrooms.component.html'

})
export class AllClassroomComponent implements OnInit {
    classroomteacher: string;
    classroomname: string;
    school: string = 'default';
    schools: ISchool[];
    allClassrooms: IClassroom[];
    errorMessage: string;
    isschoolinvalid: boolean;
    constructor(private _dataService: DataService) {
    }

    ngOnInit(): void {

        this._dataService.getAllSchools()
            .subscribe(
                    schools => this.schools = schools,
                    error => this.errorMessage = <any>error
            );

        this._dataService.getAllClassrooms()
            .subscribe(
                    classrooms => {
                        console.log(classrooms);
                        this.allClassrooms = classrooms;
                    },
                    error => this.errorMessage = <any>error
            );

    }
    addClassroom(form: NgForm) {

        this.validateschoolname(this.school);
        if (this.isschoolinvalid)
            return;
        console.log('form:' + form);
        this._dataService.addClassroom({
                                name: this.classroomname,
                                teacher: this.classroomteacher,
                                school_id: this.school
                            })
                .subscribe(
                         data => {
                             this.allClassrooms = data;
                             form.reset();
                            this.school = 'default';
                            this.classroomname = '';
                            this.classroomteacher = '';
                            }
            );
    }
    validateschoolname(school: string) {
        if (school === 'default')
            this.isschoolinvalid = true;
        else
            this.isschoolinvalid = false;
    }
    
}