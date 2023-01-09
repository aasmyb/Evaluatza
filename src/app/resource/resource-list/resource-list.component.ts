import { Component, OnInit } from '@angular/core';
import {Resource} from "../../models/resource.model";
import {ProjectService} from "../../services/project.service";
import {Project} from "../../models/project.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss', '../../phase/phase-list/phase-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  resources: Resource[] = [];
  projects: Project[] = [];

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged.subscribe(
      (projects: Project[])=>{
        this.projects = projects;
      }
    );
    const projectID = this.route.snapshot.params['prID'];
    this.resources = this.projects[projectID].resources;
  }

  onCreateSelected(){
    this.router.navigate(
      ['Manager'],
      {relativeTo: this.route, queryParams:{mode: 'Create'}});
  }
}
