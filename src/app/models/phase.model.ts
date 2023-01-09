import {Task} from "./task.model";

export class Phase {

  constructor(
    public name: string,
    public tasks: Task[]) {}
}
