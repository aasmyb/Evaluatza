import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../models/project.model";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  // @ts-ignore
  @Input() project: Project;
  // @ts-ignore
  @Input('projectID') prId: number;
  imgSrc = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.imgSrc = this.project.type === "Waterfall"?
      '../../../../assets/images/waterfall.svg' :
      '../../../../assets/images/scrum.svg';
  }

  onChooseProject() {
    this.authService.login(this.prId);
  }
}
