import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";
import {Phase} from "../../models/phase.model";
import {Task} from "../../models/task.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
  host: {
  class:'app-body'
}
})
export class ProjectInfoComponent implements OnInit {
  projects: Project[] = [];
  // @ts-ignore
  project: Project;
  // @ts-ignore
  tasksPer: number = 0;
  taskPerStr: string= "0%";


  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    const projectID = this.route.snapshot.params['prID']
    this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged.subscribe(
      (projects: Project[])=>{
        this.projects = projects;
        this.project = this.projects[projectID];
      }
    );
    this.project = this.projects[projectID];

    let doneTasks = 0, totalTasks = 0;
    this.project.phases.map(
      (phaseElem: Phase)=>{
        phaseElem.tasks.map(
          (taskElem: Task)=>{
            totalTasks++;
            if(taskElem.isDone){
              doneTasks++;
            }
          }
        );
      }
    );
    if(totalTasks>0){
      this.tasksPer = ((doneTasks/totalTasks)*100);
      this.tasksPer = this.tasksPer | 0;
      this.taskPerStr = String(this.tasksPer)+"%";
    }
  }

  onDeleteProject(){
    const projectID = this.route.snapshot.params['prID']
    this.authService.logout();
    this.projectService.deleteProject(projectID)
    this.router.navigate(['/Home']);
  }


}
