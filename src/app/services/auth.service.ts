import { EventEmitter } from "@angular/core";
import { Injectable } from '@angular/core';
import {ProjectService} from "./project.service";

@Injectable()
export class AuthService {
  constructor(private projectService: ProjectService) {
  }
  projectAuth = false;
  projectAuthenticated = new EventEmitter<boolean>();

  isAuthenticated() {
    return this.projectAuth;
  }

  login(projectID: number) {
    this.projectService.projectWasSelected.emit(projectID);
    this.projectAuth = true;
    this.projectAuthenticated.emit(this.projectAuth);
  }

  logout() {
    this.projectService.projectSelected = -1;
    this.projectAuth = false;
    this.projectAuthenticated.emit(this.projectAuth);
  }
}
