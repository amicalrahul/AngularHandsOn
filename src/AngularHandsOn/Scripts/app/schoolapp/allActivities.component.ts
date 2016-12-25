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
    constructor(private _dataService: DataService, private _formBuilder: FormBuilder) {
    }
    private submit() {
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
                    activityName: this._formBuilder.control(null, Validators.required),
                    classroom: this._formBuilder.control('default', Validators.required),
            date: this._formBuilder.control(null, Validators.required)
        });
    }
    ngOnInit(): void {
        this.buildForm();

        this._dataService.getAllActivities()
            .subscribe(activity => {
                console.log(activity);
                this.allActivities = activity;
            },
            error => this.errorMessage = <any>error);
    }
}