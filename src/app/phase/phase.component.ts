import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss'],
  host: {
    class:'app-body'
  }
})
export class PhaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}


}
