import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../../services/match.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Match } from '../../../models/match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  todayMatches: Match[] = [];

  constructor(private matchService: MatchService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.matchService.getTodayMatches().subscribe(matches => {
      this.todayMatches = matches;
    })
  }

  calculateRemainingPlayers(match) {
    return 9;
  }

}
