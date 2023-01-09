import {Component, Input, OnInit} from '@angular/core';
import {Phase} from "../../../models/phase.model";
import {Task} from "../../../models/task.model";
import {Project} from "../../../models/project.model";
import {ProjectService} from "../../../services/project.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-phase-item',
  templateUrl: './phase-item.component.html',
  styleUrls: ['./phase-item.component.scss']
})
export class PhaseItemComponent implements OnInit {
  @Input() projects: Project[] = [];
  // @ts-ignore
  project: Project;
  // @ts-ignore
  @Input() phase: Phase;
  // @ts-ignore
  @Input() phaseIndex: number;
  projectID = this.route.snapshot.params['prID'];
  tasksDone: number = 0;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit(): void {
    const filteredTasks = this.phase.tasks.filter(
      (task: Task)=>{
        return task.isDone;
      }
    );
    this.tasksDone = filteredTasks.length;

    this.project = this.projects[this.projectID];

  }

  onDeletePhase(){
    this.project.phases.splice(this.phaseIndex, 1);
    this.projectService.updateProject(this.project, this.projectID);
  }

  onModifyPhase(){
    this.router.navigate(
      ['Manager'],
      {relativeTo: this.route, queryParams: {mode: 'Modify', phsID: this.phaseIndex}}
    );
  }
}
