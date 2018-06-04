import { Team } from "../models/team";
import { Player } from "../models/player";

export class JoinRequest {
    player: Player;
    team: Team;

    constructor(player:Player, team:Team) {
        this.player = player;
        this.team = team;
    }
}