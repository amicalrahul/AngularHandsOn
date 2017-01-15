import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: '../../app/products/productedit/basicinfo.component.html'
})
export class ProductBasicInfoComponent implements OnInit {

    id: number;
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.id = +this.route.snapshot.url[0];
    }
}