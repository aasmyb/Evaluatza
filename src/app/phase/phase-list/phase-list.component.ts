import {Component, Input, OnInit} from '@angular/core';
import {Phase} from "../../models/phase.model";
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-phase-list',
  templateUrl: './phase-list.component.html',
  styleUrls: ['./phase-list.component.scss']
})
export class PhaseListComponent implements OnInit {
  phases: Phase[] = [];
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
    this.phases = this.projects[projectID].phases;
  }

  onCreateSelected(){
    this.router.navigate(
      ['Manager'],
      {relativeTo: this.route, queryParams:{mode: 'Create'}});
  }
}
