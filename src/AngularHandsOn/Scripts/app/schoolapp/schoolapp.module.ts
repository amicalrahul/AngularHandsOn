import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { DataService } from './services/data.service';
import { HomeComponent } from './home.component';
import { AllActivitiesComponent } from './allActivities.component';
import { AllClassroomComponent } from './allClassrooms.component';
import { AllSchoolsComponent } from './allSchools.component';
import { ClassroomDetailComponent } from './classroomDetail.component';
import { ClassroomComponent } from './classroom.component';
import { ClassRoomGuard } from './services/classroom-guard.service';
import { SharedModule } from '../shared/shared.module';
import { SchoolAppRoutingModule } from './schoolapp-router.module';

@NgModule({
    declarations: [HomeComponent,
        AllSchoolsComponent, AllClassroomComponent, AllActivitiesComponent, ClassroomComponent, ClassroomDetailComponent],
    imports: [SharedModule, SchoolAppRoutingModule],
    providers: [ClassRoomGuard, DataService],
})
export class SchoolAppModule { }