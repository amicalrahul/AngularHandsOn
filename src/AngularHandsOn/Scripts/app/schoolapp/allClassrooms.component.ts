import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/schoolapp/services/data.service';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    templateUrl: '../../app/schoolapp/allClassrooms.component.html'

})
export class AllClassroomComponent implements OnInit {
    allClassrooms: IClassroom[];
    errorMessage: string;
    constructor(private _dataService: DataService) {
    }

    ngOnInit(): void {

        this._dataService.getAllClassrooms()
            .subscribe(classrooms => {
                console.log(classrooms);
                this.allClassrooms = classrooms;
            },
            error => this.errorMessage = <any>error);

    }
    
}