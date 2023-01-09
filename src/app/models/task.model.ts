export class Task {
  public isDone: boolean = false;
  public endDate: string = '';

  constructor(
    public name: string,
    public type: string,
    public startDate: string,
    public resource: string) {}
}
