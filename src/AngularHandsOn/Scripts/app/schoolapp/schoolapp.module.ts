import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AllSchoolsResolve } from './allschools.resolve';
import { ClassroomSearchComponent } from './classroomsearch.component';
import { ActivitySeacrhComponent } from './activitysearch.component';

import { HighlightDirective } from './directives/highlight.directive';
import { FilteredActivities } from './filters/filteredactivities.pipe';
import { ClassroomDetailResolve } from './classroomDetail.resolve';

@NgModule({
    declarations: [HomeComponent,
        AllSchoolsComponent, AllClassroomComponent, AllActivitiesComponent, ClassroomComponent, ClassroomDetailComponent,
        HighlightDirective, ClassroomSearchComponent, ActivitySeacrhComponent, FilteredActivities],
    imports: [SharedModule, SchoolAppRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [ClassRoomGuard, DataService, AllSchoolsResolve, ClassroomDetailResolve],
})
export class SchoolAppModule { }