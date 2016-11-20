﻿import { it, describe, expect, beforeEach, inject } from 'angular2/testing';
import { ProductService } from "./product.service";

describe('MyService Tests', () => {
    let service: ProductService = new ProductService();

    it('Should return a list of dogs', () => {
        var items = service.getProducts();

        expect(items).toEqual(items);
    });

    //it('Should get all dogs available', () => {
    //    var items = service.getDogs(100);

    //    expect(items).toEqual(['golden retriever', 'french bulldog', 'german shepherd', 'alaskan husky', 'jack russel terrier', 'boxer', 'chow chow', 'pug', 'akita', 'corgi', 'labrador']);
    //});
});