import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";
import {Phase} from "../../models/phase.model";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-phase-manager',
  templateUrl: './phase-manager.component.html',
  styleUrls: ['./phase-manager.component.scss']
})
export class PhaseManagerComponent implements OnInit {
  projectID: number = this.route.snapshot.params['prID'];
  projects: Project[] = this.projectService.getProjects();
  selectedProject: Project = this.projects[this.projectID];
  mode: string= '';
  phaseID: number = -1;
  oldPhaseName: string= '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParams: Params)=>{
        this.mode = queryParams['mode'];
        if(this.mode === 'Modify'){
          this.phaseID = queryParams['phsID'];
          this.oldPhaseName = this.selectedProject.phases[this.phaseID].name;
        }
      }
    );
  }

  onSubmit(phaseForm: NgForm){
    if (this.mode === 'Create'){
      this.selectedProject.phases.push(
        new Phase(phaseForm.value.phaseName, [])
      );
    } else if (this.mode === 'Modify'){
      this.selectedProject.phases[this.phaseID].name = phaseForm.value.phaseName;
    }
    this.projectService.updateProject(this.selectedProject, this.projectID)
    phaseForm.reset();
    this.onCloseForm();
  }

  onCloseForm(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
