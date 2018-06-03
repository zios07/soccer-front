import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  homeLink: string;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('connectedPlayer');
    this.router.navigate(['/']);
  }

}
