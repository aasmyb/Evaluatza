import {Phase} from "./phase.model";
import {Resource} from "./resource.model";

export class Project {
  public phases: Phase[] = [];
  public resources: Resource[] = [];

  constructor(
    public name: string,
    public description: string,
    public type: string,
    public workingDays: string[],
    public startDate: string) {}
}
