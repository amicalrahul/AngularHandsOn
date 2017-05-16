import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../app/schoolapp/services/data.service';

import { ISchool } from '../../app/schoolapp/interfaces/school';
import { IClassroom } from '../../app/schoolapp/interfaces/classroom';
import { IActivity } from '../../app/schoolapp/interfaces/activity';
import { TOASTR_TOKEN, Toastr } from '../../app/shared/toastr.service';


@Component({
    moduleId: module.id,
    templateUrl: 'allSchools.component.html'

})
export class AllSchoolsComponent implements OnInit {
    schools: ISchool[];
    errorMessage: string;
    schoolname: string = null;
    schoolprincipal: string = null;
    editing: boolean = false;
    constructor(private dataService: DataService, private route: ActivatedRoute,
            @Inject(TOASTR_TOKEN) private toastr: Toastr) {
    }

    ngOnInit(): void {
        this.schools = this.route.snapshot.data['allschools'];
    }

    addSchool(): void {
        this.dataService.addSchool({
            name: this.schoolname,
            principal: this.schoolprincipal
        }).subscribe(data => {
            this.toastr.success('School Added');
            this.schools = data;
            this.schoolname = null;
            this.schoolprincipal = null;
        }
            );
    }


    deleteSchool(school: ISchool): void {
        school.deleting = true;
    }

    removeSchool(school: ISchool): void {
        this.dataService.deleteSchool(school.id.toString()).subscribe(data =>
            this.schools = data);
    }

    cancelRemove(school: ISchool): void {
        school.deleting = false;
    }

    editSchool(school: ISchool): void {
        school.editing = true;
        this.editing = school.editing;
    }

    updateSchool(school: ISchool): void {
        this.dataService.updateSchool(school).
            subscribe(data => {
                this.schools = data;
            }
            );
    }
    cancelUpdate(school: ISchool): void {
        school.editing = false;
        this.editing = school.editing;
    }
}