import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GithubComponent} from './github/github.component';
import {UserInfoGithubComponent} from './user-info-github/user-info-github.component';


const routes: Routes = [
  {path: '', component: GithubComponent},
  {path: 'github', component: GithubComponent},
  {path: 'github/user', component: UserInfoGithubComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
