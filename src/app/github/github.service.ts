import {Injectable} from '@angular/core';
import {IGitHub} from '../interfaces/all.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class GithubService {
  constructor(private httpClient: HttpClient) {
  }


  public getGithub(search: string, page: number): Observable<IGitHub> {
    console.log(search);
    return this.httpClient.get<IGitHub>('https://api.github.com/search/users?q=' + search
          + '&per_page=6'
          + '&page=' + page);
  }

  public getGithubByLogin(search: string): Observable<any> {
    return this.httpClient.get('https://api.github.com/users/' + search);
  }

  public getfollowingUsers(search: string): Observable<any> {
    return this.httpClient.get('https://api.github.com/users/' + search + '/following');
  }

  public getFollowersUsers(search: string): Observable<any> {
    return this.httpClient.get('https://api.github.com/users/' + search + '/followers');
  }

  public getReposUsers(search: string): Observable<any> {
    return this.httpClient.get('https://api.github.com/users/' + search + '/repos');
  }

}
