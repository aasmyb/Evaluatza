import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../models/project.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project.service";
import {Task} from "../../../models/task.model";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss', '../../../phase/phase-list/phase-item/phase-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  // @ts-ignore
  @Input() projects: Project[];
  // @ts-ignore
  @Input() task: Task;
  // @ts-ignore
  @Input() taskID: number;
  // @ts-ignore
  @Input() phaseID: number;
  taskStatus: string = '';
  taskDueDate: string = '';
  projectID = this.route.snapshot.params['prID'];
  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit(): void {
    this.taskStatus = this.task.isDone ? 'done': 'pending';
    this.taskDueDate = this.task.endDate === '' ? 'pending' : this.getDate();
  }

  onDeleteTask(){
    this.projects[this.projectID].phases[this.phaseID].tasks
      .splice(this.taskID, 1);
    this.projectService.updateProject(this.projects[this.projectID],
                                      this.projectID);
  }

  onModifyTask(){
    this.router.navigate(
      ['Manager'],
      {relativeTo: this.route,
             queryParams: {mode: 'Modify', taskID: this.taskID, phsID: this.phaseID}}
    );
  }

  getDate(): string{
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return  mm + '/' + dd + '/' + yyyy;
  }

  onCompleteTask(){
    const currentStatus = this.projects[this.projectID].phases[this.phaseID].tasks[this.taskID].isDone;
    if(!currentStatus) {
      this.projects[this.projectID].phases[this.phaseID].tasks[this.taskID].isDone = true;
      this.projects[this.projectID].phases[this.phaseID].tasks[this.taskID].endDate = this.getDate();
      this.projectService.updateProject(this.projects[this.projectID],
        this.projectID);
    }
  }
}
