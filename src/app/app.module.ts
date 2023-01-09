import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

import {ProjectService} from "./services/project.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProjectSplashComponent } from './project/project-splash/project-splash.component';
import { ProjectManagerComponent } from './project/project-manager/project-manager.component';
import { ProjectsListComponent } from './project/projects-list/projects-list.component';
import { ProjectItemComponent } from './project/projects-list/project-item/project-item.component';
import { ProjectInfoComponent } from './project/project-info/project-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhaseComponent } from './phase/phase.component';
import { TaskComponent } from './task/task.component';
import { ResourceComponent } from './resource/resource.component';
import { ResourceListComponent } from './resource/resource-list/resource-list.component';
import { ResourceItemComponent } from './resource/resource-list/resource-item/resource-item.component';
import { PhaseListComponent } from './phase/phase-list/phase-list.component';
import { PhaseItemComponent } from './phase/phase-list/phase-item/phase-item.component';
import { PhaseManagerComponent } from './phase/phase-manager/phase-manager.component';
import { ResourceManagerComponent } from './resource/resource-manager/resource-manager.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskItemComponent } from './task/task-list/task-item/task-item.component';
import { TaskManagerComponent } from './task/task-manager/task-manager.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProjectSplashComponent,
    ProjectManagerComponent,
    ProjectsListComponent,
    ProjectItemComponent,
    ProjectInfoComponent,
    NotFoundComponent,
    PhaseComponent,
    TaskComponent,
    ResourceComponent,
    ResourceListComponent,
    ResourceItemComponent,
    PhaseListComponent,
    PhaseItemComponent,
    PhaseManagerComponent,
    ResourceManagerComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ProjectService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
