import { Team } from "./team";
import { Statistic } from "./statistic";
import { Address } from "./address";

export class Player {
    
    id: number;

    firstName: string;

    lastName: string;

    address: Address;

    preferredPosition: string;

    email: string;

    username: string;

    team: Team ;

    statistic: Statistic;

    password: string;
}