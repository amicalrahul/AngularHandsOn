import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './products/product-list.component';
import { ProductFilterPipe } from './products/product-filter.pipe';
import { StarComponent } from './shared/star.component';
import { ProductService } from './products/product.service';
import { DataService } from './schoolapp/services/data.service';
import { HomeComponent } from './schoolapp/home.component';
import { AllActivitiesComponent } from './schoolapp/allActivities.component';
import { AllClassroomComponent } from './schoolapp/allClassrooms.component';
import { AllSchoolsComponent } from './schoolapp/allSchools.component';
import { ClassroomDetailComponent } from './schoolapp/classroomDetail.component';
import { ClassroomComponent } from './schoolapp/classroom.component';

import { WelcomeComponent } from './home/welcome.component';
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule,
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { path: 'products', component: ProductListComponent },
            { path: 'schoolapphome', component: HomeComponent },
            { path: 'allschools', component: AllSchoolsComponent },
            { path: 'allclassrooms', component: AllClassroomComponent },
            { path: 'activities', component: AllActivitiesComponent },
            { path: 'classroom/:id', component: ClassroomComponent },
            { path: 'classroomdetail/:id', component: ClassroomDetailComponent },
            { path: '', redirectTo:'welcome', pathMatch: 'full' }
        ],
            { useHash: true }
        )],
    declarations: [AppComponent, WelcomeComponent, ProductListComponent, ProductFilterPipe, StarComponent, HomeComponent,
        AllSchoolsComponent, AllClassroomComponent, AllActivitiesComponent, ClassroomComponent, ClassroomDetailComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
