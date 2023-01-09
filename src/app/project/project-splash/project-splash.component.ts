import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-project-splash',
  templateUrl: './project-splash.component.html',
  styleUrls: ['./project-splash.component.scss'],
  host: {
    class:'app-body'
  }
})
export class ProjectSplashComponent implements OnInit {
  selectedTab = 'splash';


  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {}

}
