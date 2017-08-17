import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ICountry } from '../../../app/testapp/interfaces/country';


@Injectable()
export class DataService {

    constructor(private _http: Http) { }
    countriesUrl: string = '/api/home1/Countries/';


    getCountriesbycode(name: string): Observable<ICountry[]> {
        return this._http.get(this.countriesUrl + '?name=' + name)
            .map((response: Response) => (<ICountry[]>response.json()))
            .do(data => console.log('getCountriesbycode: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllCountries(): Observable<ICountry[]> {
        return this._http.get(this.countriesUrl)
            .map(this.mapCountryResponse)
            .do(data => console.log('GetSchools: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    private mapCountryResponse(response: Response) {
        return <ICountry[]>response.json();
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
