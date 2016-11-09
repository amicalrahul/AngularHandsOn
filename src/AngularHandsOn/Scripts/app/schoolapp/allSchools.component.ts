import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/schoolapp/services/data.service';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    templateUrl: '../../app/schoolapp/allSchools.component.html'

})
export class AllSchoolsComponent implements OnInit {
    schools: ISchool[];
    errorMessage: string;
    constructor(private _dataService: DataService) {
    }

    ngOnInit(): void {

        this._dataService.getAllSchools()
            .subscribe(products => {
                this.schools = products;
            },
            error => this.errorMessage = <any>error);

    }
}