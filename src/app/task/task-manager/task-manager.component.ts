import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {NgForm} from "@angular/forms";
import {Task} from "../../models/task.model";

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {
  projectID: number = this.route.snapshot.params['prID'];
  projects: Project[] = this.projectService.getProjects();
  selectedProject: Project = this.projects[this.projectID];
  mode: string = '';
  taskID: number = -1;
  phaseID: number = -1;
  scrumTaskTypes: string[] = [];
  oldTask: Task = {name: '', type: '', startDate: '', resource: '', isDone: false, endDate: ''};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.mode = queryParams['mode'];
        if (this.mode === 'Modify') {
          this.taskID = queryParams['taskID'];
          this.phaseID = queryParams['phsID'];
          this.oldTask = this.selectedProject.phases[this.phaseID].tasks[this.taskID];
        }
      }
    );
    if (this.selectedProject.type === 'Scrum') {
      this.scrumTaskTypes = this.projectService.getScrumProcesses();
    }
  }

  onSubmit(taskForm: NgForm) {
    const formValues = taskForm.value;
    const newTask: Task = new Task(
      formValues.taskName,
      formValues.taskType,
      formValues.taskStartDate,
      formValues.taskResource
    );
    if (this.mode === 'Create') {
      this.selectedProject.phases[formValues.taskPhase].tasks.push(newTask);
    } else if (this.mode === 'Modify') {
      if(+this.phaseID !== +formValues.taskPhase){
        this.projects[this.projectID].phases[this.phaseID].tasks
          .splice(this.taskID, 1);
        newTask.isDone = this.oldTask.isDone;
        newTask.endDate = this.oldTask.endDate;
        this.selectedProject.phases[formValues.taskPhase].tasks.push(newTask);
      } else {
        this.selectedProject.phases[formValues.taskPhase].tasks[this.taskID] = newTask;
      }
    }
    this.projectService.updateProject(this.selectedProject, this.projectID)
    taskForm.reset();
    this.onCloseForm();
  }

  onCloseForm() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
