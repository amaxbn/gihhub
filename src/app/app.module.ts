import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GithubComponent} from './github/github.component';
import {PreloaderComponent} from './preloader/preloader.component';
import {AutoInputComponent} from './auto-input/auto-input.component';
import {UserInfoGithubComponent} from './user-info-github/user-info-github.component';


@NgModule({
  declarations: [
    AppComponent,
    GithubComponent,
    PreloaderComponent,
    AutoInputComponent,
    UserInfoGithubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
