import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss',
    '../project-splash/project-splash.component.scss'],
  host: {
    class:'app-body'
  }
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged.subscribe(
      (changedProjects: Project[]) => {
        this.projects = changedProjects;
      }
    );
  }

}
