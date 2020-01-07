import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  selectedId: any;
  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    let params: any = this._route.snapshot.params;
    this.selectedId=params.id;
  }

}
