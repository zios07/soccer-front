import { Routes } from "@angular/router";
import { LandingComponent } from "./components/pages/landing/landing.component";
import { ProfileComponent } from "./components/pages/profile/profile.component";
import { HomeComponent } from "./components/pages/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { MatchComponent } from "./components/pages/match/match.component";
import { MatchSearchComponent } from "./components/pages/match-search/match-search.component";
import { MatchFormComponent } from "./components/pages/match-form/match-form.component";

export const routes: Routes = [
    { path: "", component: LandingComponent},
    { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
    { path: "match", component: MatchComponent, canActivate: [AuthGuard]},
    { path: "match/search", component: MatchSearchComponent, canActivate: [AuthGuard]},
    { path: "match/add", component: MatchFormComponent, canActivate: [AuthGuard]}
]