import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {IGithubAllData, IGitHubUsers, IQueryParams, IUserGitHub} from '../interfaces/all.interface';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {delay, switchMap, takeUntil, tap} from 'rxjs/operators';
import {forkJoin, Observable, ObservableInput, Subject} from 'rxjs';
import {GithubService} from '../github/github.service';


@Component({
  selector: 'app-user-info-github',
  templateUrl: './user-info-github.component.html',
  styleUrls: ['./user-info-github.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoGithubComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public gitLogin!: IUserGitHub;

  public gitFollow!: IGitHubUsers[];

  public gitFollowers!: IGitHubUsers[];

  public gitRepos!: IUserGitHub[];

  public preloader: boolean = true;

  constructor(private githubService: GithubService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private changeDetectionRef: ChangeDetectorRef) {
  }


  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        () => {
          return this.getAllData('amaxbn');
        }
        // takeUntil(this.destroy$),
        // delay(500),
        // switchMap((params: Observable<any>) => {
        //     if (params.login) {
        //       return this.getAllData(params.login);
        //     }
        //   }
        // )
      )
      .subscribe((params: IGithubAllData) => {
        // this.getUserByLogin(params.login);
        this.gitLogin = params[0];
        this.gitFollow = params[1];
        this.gitFollowers = params[2];
        this.gitRepos = params[3];
        this.preloader = false;
        this.changeDetectionRef.detectChanges();
        console.log(params); // {order: "popular"}
      });
  }


  // Observable<[IIdentDescForHead[], IIdentDesc[], IIdentDesc[]]>

  private getAllData(login: any): Observable<IGithubAllData> {
    return forkJoin(
      [
        this.getUserByLogin(login),
        this.getFollowUsers(login),
        this.getFollowersUsers(login),
        this.getRepos(login)
      ]
    );
  }

  public gotoGithub() {
    this.router.navigate(['/github']);
  }

  public getUserByLogin(login): Observable<IUserGitHub> {
    return this.githubService.getGithubByLogin(login);
  }

  public goUserGithub(login) {
    window.location.href = 'https://github.com/' + login;
  }

  public goReposGithub(login, repos) {
    window.location.href = 'https://github.com/' + login + '/' + repos;
  }

  public getFollowUsers(login): Observable<IGitHubUsers[]> {
    return this.githubService.getfollowingUsers(login);
  }

  public getFollowersUsers(login): Observable<IGitHubUsers[]> {
    return this.githubService.getFollowersUsers(login);
  }

  public getRepos(login): Observable<IUserGitHub[]> {
    return this.githubService.getReposUsers(login);
  }

  public getFollowersByLogin(login): void {
    this.router.navigate(['/github/user'], {queryParams: {login}});
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
