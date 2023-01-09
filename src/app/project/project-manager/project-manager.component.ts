import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Project} from "../../models/project.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss'],
  host: {
    class:'app-body'
  }
})
export class ProjectManagerComponent implements OnInit {

  constructor(private projectService: ProjectService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  onCloseManager(){
    this.router.navigate(['/Home']);
  }

  onSubmit(form: NgForm) {
    if(form.valid){
      const formValues = form.value;
      const newProject = new Project(
        formValues.projectName,
        formValues.projectDesc,
        formValues.projectType,
        formValues.projectWorkingDays,
        formValues.projectStartDate);

      form.reset();
      this.projectService.addProject(newProject);
      const newProjectID = this.projectService.getAddedProjectID();
      this.authService.login(newProjectID);
      this.router.navigate(['/Info', newProjectID]);
    }
  }
}
