import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../app/schoolapp/services/data.service';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    templateUrl: '../../app/schoolapp/classroom.component.html'

})
export class ClassroomComponent implements OnInit {


    classroom: IClassroom;
    errorMessage: string = '';
    constructor(private _dataService: DataService, private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this._dataService.getClassroom(this._route.snapshot.params['id'])
            .subscribe(result => {
                this.classroom = result;
            },
            error => this.errorMessage = <any>error);
        if (this.errorMessage !== '') {
            console.log(this.errorMessage);
        }
    }
}