import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ProjectService} from "../services/project.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  projectID: number = -1;
  isAuthenticated = false;
  constructor(private authService: AuthService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.authService.projectAuthenticated.subscribe(
      (authState: boolean) => {
        this.isAuthenticated = authState;
      }
    );

    this.projectService.projectWasSelected.subscribe(
      (prID: number)=> {
        this.projectID = prID;
      }
    );
  }

}
