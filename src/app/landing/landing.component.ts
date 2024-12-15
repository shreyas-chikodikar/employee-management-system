import { Component, effect, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  title: String = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) {
    effect(() => {
      this.title = this.sharedDataService.getData();
    });
  }

  ngOnInit(): void {
    this.router.navigate(['employee-list'], { relativeTo: this.route });
  }
}
