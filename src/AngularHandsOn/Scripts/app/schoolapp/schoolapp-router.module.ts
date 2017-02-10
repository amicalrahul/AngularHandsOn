import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { HomeComponent } from './home.component';
import { AllActivitiesComponent } from './allActivities.component';
import { AllClassroomComponent } from './allClassrooms.component';
import { AllSchoolsComponent } from './allSchools.component';
import { ClassroomDetailComponent } from './classroomDetail.component';
import { ClassroomComponent } from './classroom.component';
import { ClassRoomGuard } from './services/classroom-guard.service';
import { AllSchoolsResolve } from './allschools.resolve';
import { ClassroomDetailResolve } from './classroomDetail.resolve';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'schoolapphome', component: HomeComponent },
        { path: 'classroom/:id', canActivate: [ClassRoomGuard], component: ClassroomComponent },
        {
            path: 'allschools', component: AllSchoolsComponent, resolve: {
                allschools: AllSchoolsResolve
            }
        },
        { path: 'allclassrooms', component: AllClassroomComponent },
        { path: 'activities', component: AllActivitiesComponent },
        {
            path: 'classroomdetail',
            component: ClassroomDetailComponent, resolve: {
                classroomdetail: ClassroomDetailResolve
            }
        },
    ])],
    exports: [RouterModule]
        
        
})
export class SchoolAppRoutingModule {
}