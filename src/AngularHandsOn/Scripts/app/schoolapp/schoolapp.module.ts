import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { DataService } from './services/data.service';
import { HomeComponent } from './home.component';
import { AllActivitiesComponent } from './allActivities.component';
import { AllClassroomComponent } from './allClassrooms.component';
import { AllSchoolsComponent } from './allSchools.component';
import { ClassroomDetailComponent } from './classroomDetail.component';
import { ClassroomComponent } from './classroom.component';
import { ClassRoomGuard } from './services/classroom-guard.service';

@NgModule({
    declarations: [HomeComponent,
        AllSchoolsComponent, AllClassroomComponent, AllActivitiesComponent, ClassroomComponent, ClassroomDetailComponent],
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forChild([
        { path: 'schoolapphome', component: HomeComponent },
        { path: 'allschools', component: AllSchoolsComponent },
        { path: 'allclassrooms', component: AllClassroomComponent },
        { path: 'activities', component: AllActivitiesComponent },
        { path: 'classroom/:id', canActivate: [ClassRoomGuard], component: ClassroomComponent },
        { path: 'classroomdetail/:id', component: ClassroomDetailComponent },
    ])],
    providers: [ClassRoomGuard, DataService],
})
export class SchoolAppModule { }