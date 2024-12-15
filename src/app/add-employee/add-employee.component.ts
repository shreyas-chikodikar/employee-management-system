import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  NgModule,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedDataService } from '../../services/shared-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  MatCalendar,
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
  MatNativeDateModule,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

const DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MMM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'D MMM YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm = new FormGroup({
    employeeName: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    from: new FormControl(),
    to: new FormControl(),
  });

  roles: String[] = [
    'Product Designer',
    'Flutter Developer',
    'QA Tester',
    'Product Owner',
  ];

  exampleHeader = ExampleHeader;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.setData('Add Employee Details');
  }

  onSubmit(form: FormGroup) {}
}

@Component({
  selector: 'example-header',
  styles: [
    `
      .example-header {
        display: flex;
        align-items: center;
        padding: 0.5em;
      }

      .example-header-label {
        flex: 1;
        height: 1em;
        font-weight: 500;
        text-align: center;
      }

      .example-double-arrow .mat-icon {
        margin: -22%;
      }
    `,
  ],
  template: `
    <div class="top-date-buttons">
      <button
        mat-raised-button
        color="primary"
        style="width: 40%"
        class="no-date"
        (click)="setNoDate()"
      >
        No Date
      </button>
      <button
        mat-raised-button
        color="primary"
        (click)="setToday()"
        style="width: 40%"
      >
        Today
      </button>
      <button
        mat-raised-button
        color="primary"
        style="width: 40%"
        class="next-monday"
        (click)="setNextMonday()"
      >
        Next Monday
      </button>
      <button
        mat-raised-button
        color="primary"
        style="width: 40%"
        class="next-tuesday"
        (click)="setNextTuesday()"
      >
        Next Tuesday
      </button>
      <button
        mat-raised-button
        color="primary"
        style="width: 40%"
        class="next-week"
        (click)="setAfterAWeek()"
      >
        After 1 week
      </button>
    </div>
    <div class="example-header">
      <button mat-icon-button (click)="previousClicked()">
        <mat-icon>arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{ periodLabel }}</span>
      <button mat-icon-button (click)="nextClicked()">
        <mat-icon>arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(
        this._calendar.activeDate,
        this._dateFormats.display.monthYearLabel
      )
      .toLocaleUpperCase();
  }

  previousClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
      this._calendar.activeDate,
      -1
    );
  }

  nextClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(
      this._calendar.activeDate,
      1
    );
  }

  setToday() {
    this._calendar.selected = this._dateAdapter.today();
  }

  setNoDate() {
    return 'No Date';
  }

  // Set date to Next Monday
  setNextMonday() {
    const today = new Date();
    const date = this._dateAdapter.createDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const dayOfWeek = this._dateAdapter.getDayOfWeek(date);

    const nextMonday = (8 - dayOfWeek) % 7 || 7;
    this._calendar.selected = this._dateAdapter.addCalendarDays(
      date,
      nextMonday
    );
  }

  // Set date to Next Tuesday
  setNextTuesday() {
    const today = new Date();
    const date = this._dateAdapter.createDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const dayOfWeek = this._dateAdapter.getDayOfWeek(date);

    const nextTuesday = (9 - dayOfWeek) % 7 || 7;
    this._calendar.selected = this._dateAdapter.addCalendarDays(
      date,
      nextTuesday
    );
  }

  // Set date to Next Monday
  setAfterAWeek() {
    this._calendar.selected = this._dateAdapter.addCalendarDays(
      this._dateAdapter.today(),
      7
    );
  }
}

@NgModule({
  declarations: [AddEmployeeComponent, ExampleHeader],
  imports: [
    CommonModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: AddEmployeeComponent }]),
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class AddEmployeeModule {}