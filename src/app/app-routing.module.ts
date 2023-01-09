import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {ProjectSplashComponent} from "./project/project-splash/project-splash.component";
import {ProjectInfoComponent} from "./project/project-info/project-info.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ProjectManagerComponent} from "./project/project-manager/project-manager.component";
import {ProjectsListComponent} from "./project/projects-list/projects-list.component";
import {PhaseComponent} from "./phase/phase.component";
import {AuthGuard} from "./services/auth-guard.service";
import {ResourceComponent} from "./resource/resource.component";
import {TaskComponent} from "./task/task.component";
import {ResourceListComponent} from "./resource/resource-list/resource-list.component";
import {ResourceManagerComponent} from "./resource/resource-manager/resource-manager.component";
import {PhaseListComponent} from "./phase/phase-list/phase-list.component";
import {PhaseManagerComponent} from "./phase/phase-manager/phase-manager.component";
import {TaskListComponent} from "./task/task-list/task-list.component";
import {TaskManagerComponent} from "./task/task-manager/task-manager.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home',canActivate: [AuthGuard], component: ProjectSplashComponent},
  { path: 'Create',canActivate: [AuthGuard], component: ProjectManagerComponent},
  { path: 'Existing',canActivate: [AuthGuard], component: ProjectsListComponent},
  { path: 'Phases', canActivate: [AuthGuard], component: PhaseComponent, children: [
      {path: ':prID', component: PhaseListComponent},
      {path: ':prID/Manager', component: PhaseManagerComponent},
    ]},
  { path: 'Tasks', canActivate: [AuthGuard], component: TaskComponent, children: [
      {path: ':prID', component: TaskListComponent},
      {path: ':prID/Manager', component: TaskManagerComponent},
    ]},
  { path: 'Resources', canActivate: [AuthGuard], component: ResourceComponent, children: [
      {path: ':prID', component: ResourceListComponent},
      {path: ':prID/Manager', component: ResourceManagerComponent},
    ]},
  { path: 'Info/:prID', canActivate: [AuthGuard],  component: ProjectInfoComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
