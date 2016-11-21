import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../app/schoolapp/services/data.service';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';


@Component({
    moduleId: module.id,
    templateUrl: 'allSchools.component.html'

})
export class AllSchoolsComponent implements OnInit {
    schools: ISchool[];
    errorMessage: string;
    schoolname: string;
    schoolprincipal: string;
    constructor(private dataService: DataService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.schools = this.route.snapshot.data['allschools'];
    }

    addSchool(): void {
        this.dataService.addSchool({
            name: this.schoolname,
            principal: this.schoolprincipal
         }).subscribe(data =>
             this.schools = data);
    }


    deleteSchool(id:string): void {
        this.dataService.deleteSchool(id).subscribe(data =>
            this.schools = data);
    }
}