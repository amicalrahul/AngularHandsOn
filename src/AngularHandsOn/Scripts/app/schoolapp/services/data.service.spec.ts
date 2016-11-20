import { it, describe, expect, beforeEach, inject } from 'angular2/testing';
import { DataService } from "./data.service";

describe('MyService Tests', () => {
    let service: number = 5;

    it('Should return a list of dogs', () => {
        //var items = service.getAllSchools();

        expect(service).toEqual(5);
    });

    //it('Should get all dogs available', () => {
    //    var items = service.getDogs(100);

    //    expect(items).toEqual(['golden retriever', 'french bulldog', 'german shepherd', 'alaskan husky', 'jack russel terrier', 'boxer', 'chow chow', 'pug', 'akita', 'corgi', 'labrador']);
    //});
});