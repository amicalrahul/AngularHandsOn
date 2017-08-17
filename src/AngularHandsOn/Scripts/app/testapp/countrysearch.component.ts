import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { DataService } from './services/data.service';
import { ICountry } from '../../app/testapp/interfaces/country';

@Component({
    moduleId: module.id,
    selector: 'country-search',
    templateUrl: 'countrysearch.component.html',
    styleUrls: ['countrysearch.component.css'],
    providers: [DataService]
})
export class CountrySearchComponent implements OnInit {
    countries: Observable<ICountry[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private dataService: DataService,
        private router: Router) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.countries = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.dataService.getCountriesbycode(term)
                // or the observable of empty heroes if no search term
                : Observable.of<ICountry[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<ICountry[]>([]);
            });
    }

    gotoDetail(classroom: ICountry): void {
        //let link = ['/classroom', classroom.id];
        //this.router.navigate(link);
    }
}

