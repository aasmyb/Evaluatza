import {Component, Input, OnInit} from '@angular/core';
import {Resource} from "../../../models/resource.model";
import {Project} from "../../../models/project.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.scss', '../../../phase/phase-list/phase-item/phase-item.component.scss']
})
export class ResourceItemComponent implements OnInit {
  // @ts-ignore
  @Input() projects: Project[];
  // @ts-ignore
  @Input() resource: Resource;
  // @ts-ignore
  @Input() resourceId: number;
  projectID = this.route.snapshot.params['prID'];
  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onDeleteResource(){
    this.projects[this.projectID].resources.splice(this.resourceId, 1);
    this.projectService.updateProject(this.projects[this.projectID], this.projectID);
  }

  onModifyResource(){
    this.router.navigate(
      ['Manager'],
      {relativeTo: this.route, queryParams: {mode: 'Modify', resID: this.resourceId}}
    );
  }
}
