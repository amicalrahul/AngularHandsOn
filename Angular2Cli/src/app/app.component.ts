import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'ang2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  public constructor(private titleService: Title ) { }
  ngOnInit(): void {
     this.setTitle('AngularCliHandsOn');
  }
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
