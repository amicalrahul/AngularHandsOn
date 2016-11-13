import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { HomeComponent } from './home.component';
import { AllActivitiesComponent } from './allActivities.component';
import { AllClassroomComponent } from './allClassrooms.component';
import { AllSchoolsComponent } from './allSchools.component';
import { ClassroomDetailComponent } from './classroomDetail.component';
import { ClassroomComponent } from './classroom.component';
import { ClassRoomGuard } from './services/classroom-guard.service';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'schoolapphome', component: HomeComponent },
        { path: 'classroom/:id', canActivate: [ClassRoomGuard], component: ClassroomComponent },
        { path: 'allschools', component: AllSchoolsComponent },
        { path: 'allclassrooms', component: AllClassroomComponent },
        { path: 'activities', component: AllActivitiesComponent },
        {
            path: 'classroomdetail/:id',
            component: ClassroomDetailComponent
        },
    ])],
    exports: [RouterModule]
        
        
})
export class SchoolAppRoutingModule {
}