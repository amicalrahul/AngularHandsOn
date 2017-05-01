import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/schoolapp/services/data.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    moduleId: module.id,
    templateUrl: 'allActivities.component.html'

})
export class AllActivitiesComponent implements OnInit {
    activitiesForm: FormGroup;
    allActivities: IActivity[];
    classrooms: IClassroom[];
    errorMessage: string;
    color: string;
    isclassroominvalid: boolean;
    constructor(private _dataService: DataService, private _formBuilder: FormBuilder) {
    }
    private submit() {
        this.validateclassroom(this.activitiesForm.value.classroom);
        if (this.isclassroominvalid)
            return;

        this._dataService.addActivity({
            name: this.activitiesForm.value.activityName,
            date: this.activitiesForm.value.date,
            classroom_id: this.activitiesForm.value.classroom.id,
            school_id: this.activitiesForm.value.classroom.school_id
        })
            .subscribe(
            data => {
                this.allActivities = data;
                this.activitiesForm.reset();
                this.buildForm();
            }
            );
    }
    private buildForm() {
                this._dataService.getAllClassrooms()
                    .subscribe(
                        classrooms => this.classrooms = classrooms,
                        error => this.errorMessage = <any>error
                );

                this.activitiesForm = this._formBuilder.group({
                        activityName: [null, Validators.required],
                        classroom: ['default', Validators.required],
                        date: [null, Validators.required]
                });
                this.isclassroominvalid = true;
    }
    ngOnInit(): void {
        this.buildForm();
        this.color = 'blue';
        this._dataService.getAllActivities()
            .subscribe(activity => {
                console.log(activity);
                this.allActivities = activity;
            },
            error => this.errorMessage = <any>error);
    }
    validateclassroom(classroom:string) {
        if (classroom === 'default')
            this.isclassroominvalid = true;
        else
            this.isclassroominvalid = false;
    }
}