import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from './services/data.service';

@Injectable()
export class AllSchoolsResolve implements Resolve<any> {

    constructor(private contactsService: DataService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.contactsService.getAllSchools();
    }
}