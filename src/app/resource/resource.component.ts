import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  host: {
    class:'app-body'
  }
})
export class ResourceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
