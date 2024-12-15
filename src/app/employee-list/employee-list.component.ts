import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.component';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[] = [
    {
      employeename: 'Shreyas',
      role: 'Frontend Developer',
      from: new Date('10/22/2019'),
    },
    {
      employeename: 'Shreyas',
      role: 'Frontend Developer',
      from: new Date('10/22/2019'),
    },
    {
      employeename: 'Shreyas',
      role: 'Frontend Developer',
      from: new Date('10/22/2019'),
    },
    {
      employeename: 'Shreyas',
      role: 'Frontend Developer',
      from: new Date('10/22/2019'),
    },
    {
      employeename: 'Shreyas',
      role: 'Frontend Developer',
      from: new Date('10/22/2019'),
    },
    {
      employeename: 'Shreyas',
      role: 'Frontend Developer',
      from: new Date('10/22/2019'),
      to: new Date(),
    },
    {
      employeename: 'Shreyas',
      role: 'Frontend Developer',
      from: new Date('10/22/2019'),
      to: new Date(),
    },
    {
      employeename: 'Shreyas',
      role: 'Frontend Developer',
      from: new Date('10/22/2019'),
      to: new Date(),
    },
  ];

  currentEmployees: Employee[] = [];
  previousEmployees: Employee[] = [];

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.setData('Employee List');
    this.employeeList.forEach((employee) => {
      if (employee.to) this.previousEmployees.push(employee);
      else this.currentEmployees.push(employee);
    });
  }

  swipe(e: TouchEvent) {
    console.log(e);
  }

  addEmployee() {
    this.router.navigate(['landing/add-employee']);
  }
}
