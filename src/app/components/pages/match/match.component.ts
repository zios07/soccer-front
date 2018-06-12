import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../../services/match.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Match } from '../../../models/match';
import { AuthenticationService } from '../../../services/authentication.service';
import { PlayerService } from '../../../services/player.service';
import { Player } from '../../../models/player';
import { ParticipationService } from '../../../services/participation.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matches: Match[] = [];
  player:Player;
  page: number = 1;
  size: number = 5;
  totalPages: number;

  constructor(private matchService: MatchService,
              private participationService: ParticipationService,
              private authService: AuthenticationService,
              private playerService: PlayerService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.player = this.authService.getAuthenticatedPlayer();
    this.loadMatches();
  }

  onPageChange() {
    this.loadMatches();
  }

  loadMatches() {
    this.matchService.getMatches(this.page - 1, this.size).subscribe(resp => {
      this.totalPages= resp.totalPages * 10;
      this.matches = resp.content;
      this.verifyConstraints(this.matches);
    })
  }

  JoinMatch(match) {
    this.participationService.participate(match, this.player).subscribe(resp => {
      this.toastr.info("Joined match successfully");
      this.verifyConstraints(match);
    }, error => {
      this.toastr.error("Error while joining the match");
    });
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

  // TODO: use player participation attribut

  verifyConstraints(matches) {

    this.participationService.getPlayerParticipations(this.player.id).subscribe(participations => {
      if(Array.isArray(matches) && participations) {
        participations.forEach(participation => {
            matches.forEach(match => {
              if(participation.match.id === match.id) {
                match.hasTimeConstraint = this.hasTimeConstraint(match);
                match.hasAlreadyJoined = true;
              }
            });
            this.matches = matches;
          
        });
      } else {
        let match = matches;
        participations.forEach(participation => {
          if(participation.match.id === matches.id) {
            match.hasTimeConstraint = this.hasTimeConstraint(match);
            match.hasAlreadyJoined = true;
          }
        });
      }
    });

    

    
    
  }
}
