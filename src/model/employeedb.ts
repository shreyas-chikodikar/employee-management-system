import Dexie, { Table } from 'dexie';

export interface Employees {
  id?: Number;
  employeename: string;
  role: string;
  from: Date;
  to?: Date;
}

export class AppDB extends Dexie {
  employees!: Table<Employees, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      employees: '++id',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.employees.bulkAdd([
      {
        employeename: 'Joseph Manadan',
        role: 'Flutter Developer',
        from: new Date(),
      },
      {
        employeename: 'Joseph Manadan',
        role: 'Flutter Developer',
        from: new Date(),
      },
      {
        employeename: 'Joseph Manadan',
        role: 'Flutter Developer',
        from: new Date(),
        to: new Date(new Date().getDate() + 7),
      },
    ]);
  }
}
export const db = new AppDB();
