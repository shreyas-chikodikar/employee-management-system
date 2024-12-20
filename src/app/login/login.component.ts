import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: String = '';
  password: String = '';

  constructor(private route: Router) {}

  navigate() {
    this.route.navigate(['landing']);
  }
}
