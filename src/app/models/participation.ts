import { Match } from "./match";
import { Team } from "./team";
import { Player } from "./player";

export class Participation {
    id: number;
    team: Team;
    match: Match;
    playerId: number;

    constructor(team: Team, match: Match, playerId: number) 
    {
        this.team = team;
        this.match = match;
        this.playerId = playerId;
    }

}