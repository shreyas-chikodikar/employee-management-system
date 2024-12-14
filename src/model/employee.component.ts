export class Employee {
  employeename: String;
  role: String;
  from: Date;
  to?: Date;

  constructor(employeename: string, role: string, from: Date, to?: Date) {
    this.employeename = employeename;
    this.role = role;
    this.from = from;
    this.to = to || undefined;
  }
}
