export interface IGitHub {
  total_count: number;
  incomplete_results: boolean;
  items: IGitHubUsers[];
}

export interface IGitHubUsers {
  login: string;
  id?: number;
  node_id?: string;
  avatar_url: string;
  gravatar_id?: number;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  score?: number;
}

export interface IUserGitHub extends IGitHubUsers {
  name?: null;
  company?: null;
  blog?: string;
  location?: null;
  email?: null;
  hireable?: null;
  bio?: null;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IQueryParams {
  login: string;
}

export interface IFollowUsers {
  login: string;
}

export interface IGithubAllData {
  0: IUserGitHub;
  1: IGitHubUsers[];
  2: IGitHubUsers[];
  3: IUserGitHub[];
}



