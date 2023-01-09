import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";
import {Resource} from "../../models/resource.model";

@Component({
  selector: 'app-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.scss']
})
export class ResourceManagerComponent implements OnInit {
  projectID: number = this.route.snapshot.params['prID'];
  projects: Project[] = this.projectService.getProjects();
  selectedProject: Project = this.projects[this.projectID];
  mode: string= '';
  resourceID: number = -1;
  oldResourceName: string= '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParams: Params)=>{
        this.mode = queryParams['mode'];
        if(this.mode === 'Modify'){
          this.resourceID = queryParams['resID'];
          this.oldResourceName = this.selectedProject.resources[this.resourceID].name;
        }
      }
    );
  }

  onSubmit(resourceForm: NgForm){
    if (this.mode === 'Create'){
      this.selectedProject.resources.push(
        new Resource(resourceForm.value.ResourceName)
      );
    } else if (this.mode === 'Modify'){
      this.selectedProject.resources[this.resourceID].name = resourceForm.value.ResourceName;
    }
    this.projectService.updateProject(this.selectedProject, this.projectID)
    resourceForm.reset();
    this.onCloseForm();
  }

  onCloseForm(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
