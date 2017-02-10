import { Component , OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from './services/data.service';
import { IClassroom } from './interfaces/classroom';

@Component({
    moduleId: module.id,
    selector: 'activity-seacrh',
    templateUrl: 'activitysearch.component.html'
})
export class ActivitySeacrhComponent implements OnInit {
    activitySeacrhForm: FormGroup;
    classrooms: IClassroom[];
    @Input() selectedMonth: string;
    isclassroominvalid: boolean;

    constructor(private dataService: DataService, private fb: FormBuilder,
        private router: Router) {
    }

    buildForm() {
        this.activitySeacrhForm = this.fb.group({
            classroomlist: this.fb.control(null),
            monthlist: this.fb.control(1)
        });
    }

    ngOnInit(): void {
        this.dataService.getAllClassrooms()
            .subscribe(result => this.classrooms = result);

        this.buildForm();
        this.isclassroominvalid = true;
    }

    search() {
        this.validateclassroom(this.activitySeacrhForm.value.classroomlist.id);
        if (this.isclassroominvalid)
            return;
        let id = this.activitySeacrhForm.value.classroomlist.id;
        let month = this.activitySeacrhForm.value.monthlist;

        this.router.navigate(['/classroomdetail', { id: id, month: month }]);
    }

    validateclassroom(classroom: IClassroom) {
        if (classroom)
            this.isclassroominvalid = false;
        else
            this.isclassroominvalid = true;
    }

}
