import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { liveQuery } from 'dexie';
import { db, Employees } from '../../model/employeedb';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  lastX: any = 0;

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.setData('Employee List');
    this.employeeList$.subscribe((emp) => {
      this.employeeList = emp;
      this.employeeCategory();
    });
  }

  employeeCategory() {
    this.currentEmployees = [];
    this.previousEmployees = [];
    this.employeeList.forEach((employee) => {
      if (employee.to) this.previousEmployees.push(employee);
      else this.currentEmployees.push(employee);
    });
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

  async delete(id: any) {
    await db.employees.delete(Number(id));
  }

  onDragMoved(event: any) {
    const currentX = event.pointerPosition.x;

    if (currentX > this.lastX) {
      const element = event.source.getRootElement();
      element.style.transform = `translate3d(${this.lastX}px, 0, 0)`;
    } else {
      this.lastX = currentX;
    }
  }
}
