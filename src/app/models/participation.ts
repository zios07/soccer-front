import { Match } from "./match";
import { Team } from "./team";

export class Participation {
    id: number;
    team: Team;
    match: Match;

    constructor(team: Team, match: Match) {
        this.team = team;
        this.match = match;
    }

}