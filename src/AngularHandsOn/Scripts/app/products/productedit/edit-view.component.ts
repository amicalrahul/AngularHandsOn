import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../product.service';
@Component({
    templateUrl: '../../app/products/productedit/edit-view.component.html'
})
export class ProductEditViewComponent implements OnInit {
    title: string = 'Edit View';
    id: number;
    constructor(private service: ProductService, private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.firstChild.url[0];
    }
    navigateToInfo() {
        // Navigate with relative link
        this.router.navigate([this.id, 'info'], { relativeTo: this.route });
    }
    navigateToPrice() {
        // Navigate with relative link
        this.router.navigate([this.id, 'price'], { relativeTo: this.route });
    }
    navigateToTags() {
        // Navigate with relative link
        this.router.navigate([this.id, 'tags'], { relativeTo: this.route });
    }
}