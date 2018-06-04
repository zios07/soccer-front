import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './services/authentication.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule, RequestOptions, Http } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { CityService } from './services/city.service';
import { EntityService } from './services/entity.service';
import { NavComponent } from './components/nav/nav.component';
import { LandingNavComponent } from './components/landing-nav/landing-nav.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MatchComponent } from './components/pages/match/match.component';
import { MatchSearchComponent } from './components/pages/match-search/match-search.component';
import { MatchFormComponent } from './components/pages/match-form/match-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ProfileComponent,
    NavComponent,
    HomeComponent,
    LandingNavComponent,
    MatchComponent,
    MatchSearchComponent,
    MatchFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    HttpClientModule,
    HttpModule,
    FormsModule,
  ],
  providers: [
    AuthenticationService,
    EntityService,
    CityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
