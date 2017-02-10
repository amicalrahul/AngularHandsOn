import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { DataService } from './services/data.service';
import { IClassroom } from './interfaces/classroom';

@Component({
    moduleId: module.id,
    selector: 'classroom-search',
    templateUrl: 'classroomsearch.component.html',
    styleUrls: ['classroomsearch.component.css'],
    providers: [DataService]
})
export class ClassroomSearchComponent implements OnInit {
    classrooms: Observable<IClassroom[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private dataService: DataService,
        private router: Router) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.classrooms = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.dataService.getClassroombyname(term)
                // or the observable of empty heroes if no search term
                : Observable.of<IClassroom[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<IClassroom[]>([]);
            });
    }

    gotoDetail(classroom: IClassroom): void {
        let link = ['/classroom', classroom.id];
        this.router.navigate(link);
    }
}

