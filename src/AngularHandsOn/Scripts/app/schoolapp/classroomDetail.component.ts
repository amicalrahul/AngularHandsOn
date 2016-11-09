import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/schoolapp/services/data.service';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    templateUrl: '../../app/schoolapp/classroomDetail.component.html'

})
export class ClassroomDetailComponent implements OnInit {

    ngOnInit(): void {
    }
}