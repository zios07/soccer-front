import { Team } from "./team";
import { Player } from "./player";
import { Pitch } from "./pitch";
import { Address } from "./address";

export class Match {
    id: number;
    label: string;
    address: Address;
    date: Date;
    pitch: Pitch;
    host: Team;
    guest: Team;
    winner: Team;
    hostGoals: number;
    guestGoals: number;
    manOfTheMatch: Player;
}