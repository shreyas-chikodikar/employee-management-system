export class Employee {
  id?: Number;
  employeename: String;
  role: String;
  from: Date;
  to?: Date;

  constructor(
    id: number,
    employeename: string,
    role: string,
    from: Date,
    to?: Date
  ) {
    this.id = id;
    this.employeename = employeename;
    this.role = role;
    this.from = from;
    this.to = to || undefined;
  }
}
