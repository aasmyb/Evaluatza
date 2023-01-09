import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project.model";
import {ProjectService} from "../../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../models/task.model";
import {Phase} from "../../models/phase.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss', '../../phase/phase-list/phase-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: {task:Task, phaseID:number, taskID: number}[] = [];
  phases: Phase[]= [];
  projects: Project[] = [];
  projectID = this.route.snapshot.params['prID'];

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.projectService.projectsChanged.subscribe(
      (projects: Project[])=>{
        this.projects = projects;
        this.syncTasks();
      }
    );
    this.syncTasks();
  }

  syncTasks(){
    this.phases = this.projects[this.projectID].phases;
    const newTasks: {task:Task, phaseID:number, taskID: number}[] = [];
    this.phases.map(
      (phase: Phase, phaseIndex: number)=>{
        phase.tasks.map(
          (task: Task, taskIndex: number)=>{
            newTasks.push({task: task, phaseID: phaseIndex, taskID: taskIndex});
          }
        );
      }
    );
    this.tasks = newTasks;
  }

  onCreateSelected(){
    this.router.navigate(
      ['Manager'],
      {relativeTo: this.route, queryParams:{mode: 'Create'}});
  }

}
