import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { liveQuery } from 'dexie';
import { db, Employees } from '../../model/employeedb';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[] = [];

  currentEmployees: Employee[] = [];
  previousEmployees: Employee[] = [];

  employeeList$ = liveQuery(() => db.employees.toArray());

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.setData('Employee List');
    this.employeeList$.subscribe((emp) => {
      this.employeeList = emp;
      this.employeeList.forEach((employee) => {
        if (employee.to) this.previousEmployees.push(employee);
        else this.currentEmployees.push(employee);
      });
    });
  }

  swipe(e: TouchEvent) {
    console.log(e);
  }

  addEmployee() {
    this.router.navigate(['/add-employee'], { relativeTo: this.route });
  }

  identifyList(index: number, list: Employees) {
    return `${list.id}${list.employeename}`;
  }

  edit(id: any) {
    this.router.navigate(['/add-employee', id], { relativeTo: this.route });
  }

  create() {
    console.log('hello');
  }
}
