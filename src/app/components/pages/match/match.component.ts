import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../../services/match.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Match } from '../../../models/match';
import { AuthenticationService } from '../../../services/authentication.service';
import { PlayerService } from '../../../services/player.service';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  todayMatches: Match[] = [];
  player:Player;

  constructor(private matchService: MatchService,
              private authService: AuthenticationService,
              private playerService: PlayerService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.player = this.authService.getAuthenticatedPlayer();
    this.matchService.getTodayMatches().subscribe(matches => {
      this.todayMatches = matches;
      this.todayMatches = this.verifyConstraints(this.todayMatches);
    })
  }

  JoinMatch(match, team) {
    this.player = this.authService.getAuthenticatedPlayer();
    this.playerService.joinTeam(this.player, match, team).subscribe(resp => {
      localStorage.setItem('connectedPlayer', JSON.stringify(resp.body));
      this.todayMatches = this.verifyConstraints(this.todayMatches);
      this.toastr.info(`Successfully joined ${team.name}`);
    }, error => {
      this.toastr.error("Error occured while joining the team");
    })
  }

  hasTimeConstraint(match) {
    return false;
  }

  hasAlreadyJoined(match) {
    let joined: boolean = false;
    if(this.player.participations)
      this.player.participations.forEach(participation => {
        if(participation.match.id == match.id)
          joined = true;
      })
    return joined;
  }

  verifyConstraints(matches) {
    matches.forEach(match => {
      match.hasTimeConstraint = this.hasTimeConstraint(match);
      match.hasAlreadyJoined = this.hasAlreadyJoined(match);
    });
    return matches;
  }
}
