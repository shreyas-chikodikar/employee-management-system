import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingComponent,
        children: [
          { path: 'employee-list', component: EmployeeListComponent },
          {
            path: 'add-employee',
            loadChildren: () =>
              import('../add-employee/add-employee.component').then(
                (m) => m.AddEmployeeModule
              ),
          },
        ],
      },
    ]),
  ],
  declarations: [LandingComponent, EmployeeListComponent],
})
export class LandingModule {}
