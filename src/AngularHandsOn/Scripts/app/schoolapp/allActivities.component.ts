import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/schoolapp/services/data.service';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    templateUrl: '../../app/schoolapp/allActivities.component.html'

})
export class AllActivitiesComponent implements OnInit {
    allActivities: IActivity[];
    errorMessage: string;
    constructor(private _dataService: DataService) {
    }

    ngOnInit(): void {

        this._dataService.getAllActivities()
            .subscribe(activity => {
                console.log(activity);
                this.allActivities = activity;
            },
            error => this.errorMessage = <any>error);

    }
}