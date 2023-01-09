import { EventEmitter } from "@angular/core";
import {Project} from "../models/project.model";

export class ProjectService {
  projectsChanged = new EventEmitter<Project[]>();
  projectWasSelected = new EventEmitter<number>();
  projectSelected: number = -1;
  projects: Project[] = this.getFromLocalStorage();


  scrumProcesses: string[] = ['Bug','Epic','Feature','Impediment','Backlog Item',
                              'Test Case','Test plan','Test Suite']

  getProjects(): Project[] {
    return this.projects.slice();
  }

  getScrumProcesses(): string[] {
    return this.scrumProcesses.slice();
  }

  addProject(newProject: Project){
    this.projectSelected = (this.projects.length);
    this.projects.push(newProject);
    this.saveToLocalStorage(this.projects.slice());
    this.projectsChanged.emit(this.projects.slice());
  }

  getAddedProjectID(){
    return this.projects.slice().length-1;
  }

  updateProject(project: Project, projectIndex: number): void {
    this.projects[projectIndex] = project;
    this.saveToLocalStorage(this.projects.slice());
    this.projectsChanged.emit(this.projects.slice());
  }

  deleteProject(phaseIndex: number): void {
    this.projects.splice(phaseIndex, 1);
    this.saveToLocalStorage(this.projects.slice());
    this.projectsChanged.emit(this.projects.slice());
  }

  saveToLocalStorage(projects: Project[]){
    localStorage.setItem('projectsList', JSON.stringify(projects));
  }

  getFromLocalStorage(): Project[]{
    let retrievedProjects = localStorage.getItem('projectsList');
    let projectsList: Project[] = [];
    if (retrievedProjects != null) {
      projectsList = JSON.parse(retrievedProjects);
    }
    return projectsList;
  }

}
