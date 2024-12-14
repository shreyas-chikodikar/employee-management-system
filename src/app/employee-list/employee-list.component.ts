import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

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
  ];

  currentEmployees: Employee[] = [];
  previousEmployees: Employee[] = [];

  ngOnInit(): void {
    this.employeeList.forEach((employee) => {
      if (employee.to) this.previousEmployees.push(employee);
      else this.currentEmployees.push(employee);
    });
  }

  swipe(e: TouchEvent) {
    console.log(e);
  }
}
