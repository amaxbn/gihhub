import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, debounceTime, delay, map, switchMap, tap} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {IGitHub} from '../interfaces/all.interface';
import {GithubService} from './github.service';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubComponent implements OnInit {

  public gitUsers!: IGitHub;
  public preloader: boolean = false;
  public preloaderStart: boolean = false;
  private page: number = 1;
  private perPage = 4;
  private str: string = '';
  public errors: [] = [];
  public hideBtn: boolean = false;
  public hideError: boolean = false;

  public login: FormControl = new FormControl('');

  constructor(private githubService: GithubService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    this.login.valueChanges
      .pipe(
        tap(() => {
          this.preloaderStart = true;
        }),
        switchMap((log) => {
          return this.getAllUsers(log as string);
        }),
        debounceTime(1000)
      )
      .subscribe((value) => {
        console.log('1111111111', value);
        // this.preloaderStart = false;
        this.getAllUsers(value);
      });
  }

  private getAllUsers(search: string): Observable<string> {
    this.page = 1;

    return this.githubService.getGithub(search, this.page)
      .pipe(
        tap(() => {
          // this.preloaderStart = true;
        }),
        catchError((error) => {
          this.hideError = true;

          // this.errors.push(error);

          this.changeDetectorRef.detectChanges();
          return throwError('api github not work');
        }),
        delay(500),
        map((item) => {
          if (!item.total_count) {
            console.log('no data');
          }
          this.str = search;
          this.preloaderStart = false;
          this.gitUsers = item;
          this.consDetref(item);
          return search;
        })
      );

  }

  public getUserByLogin(login: string): void {
    this.router.navigate(['/github/user'], {queryParams: {login}});
  }

  public onClick(event): void {

    this.githubService.getGithub(this.str, ++this.page)
      .pipe(
        tap(() => {
          this.preloader = true;
          this.changeDetectorRef.detectChanges();
        }),
        catchError((error) => {

          // this.errors.push(error);

          this.changeDetectorRef.detectChanges();
          this.hideError = true;
          return throwError('users not found');
        }),
        delay(500)
      )
      .subscribe((item: IGitHub) => {
          this.gitUsers.items = this.gitUsers.items.concat(item.items);
          this.preloader = false;
          this.consDetref(item);
        },
        (error) => {
          this.changeDetectorRef.detectChanges();
          this.hideError = true;

          // this.errors.push(error);

          console.log(error);
          --this.page;
        });
  }

  private consDetref(item): void {
    console.log('item', item);
    console.log('this.gitUsers.items', this.gitUsers.items);
    this.hideError = false;
    this.hideBtn = (item.total_count > this.perPage * this.page);
    this.changeDetectorRef.detectChanges();
  }
}
