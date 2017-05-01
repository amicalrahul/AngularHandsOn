import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/schoolapp/services/data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    templateUrl: '../../app/schoolapp/classroomDetail.component.html'

})
export class ClassroomDetailComponent implements OnInit {

    classroom: IClassroom;
    timePeriod: string;
    month: number;
    errorMessage: string = '';
    selectedId: number;
    constructor(private dataService: DataService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        let id = this.route.snapshot.params['id'];
        this.month = this.route.snapshot.params['month'];

        this.timePeriod = this.dataService.getMonthName(this.month);

        this.classroom = this.route.snapshot.data['classroomdetail'];
    }
}