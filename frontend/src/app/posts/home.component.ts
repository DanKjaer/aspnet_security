import { Component, OnInit } from "@angular/core";
import { Post, User, HomeService } from './home.service';
import { Observable, map, shareReplay, switchMap, zip } from "rxjs";

@Component({
  template: `
    <app-title [title]="'Home'"></app-title>

    <ion-toolbar>
      <ion-segment #segment value="uploads">
        <ion-segment-button *ngFor="let segment of segments$ | async" [value]="segment.value">
          <ion-label>{{segment.label}}</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-toolbar>

    <ion-content [ngSwitch]="segment.value">

      <ion-list *ngSwitchCase="'uploads'" [inset]="true">
        <ion-item [id]="'post_'+i" *ngFor="let post of posts$ | async; index as i"
                  [routerLink]="['/posts', post.id]">
          <ion-label>
            <h2>{{post.title}}</h2>
            <p>{{post.content}}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list *ngSwitchCase="'followers'" [inset]="true">
        <ion-item [id]="'follower_'+user.id" *ngFor="let user of followers$ | async">
          <ion-avatar slot="start">
            <img [src]="user.avatarUrl">
          </ion-avatar>
          <ion-label>
            <h2>{{user.fullName}}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list *ngSwitchCase="'following'" [inset]="true">
        <ion-item [id]="'following_'+user.id" *ngFor="let user of following$ | async">
          <ion-avatar slot="start">
            <img [src]="user.avatarUrl">
          </ion-avatar>
          <ion-label>
            <h2>{{user.fullName}}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

    </ion-content>
  `
})
export class HomeComponent implements OnInit {
  segments$?: Observable<{ label: string, value: string }[]>;
  posts$?: Observable<Post[]>;
  followers$?: Observable<User[]>;
  following$?: Observable<User[]>;

  constructor(private readonly service: HomeService) { }

  ngOnInit(): void {
    const user$ = this.service.getUser().pipe(shareReplay());
    this.posts$ = user$.pipe(switchMap(({ id }) => this.service.getPosts(id)), shareReplay());
    this.followers$ = user$.pipe(switchMap(({ id }) => this.service.getFollowers(id)), shareReplay());
    this.following$ = user$.pipe(switchMap(({ id }) => this.service.getFollowing(id)), shareReplay());
    this.segments$ = zip(this.posts$, this.followers$, this.following$)
      .pipe(map(([posts, followers, following]) =>
        [
          { label: `Uploads (${posts.length})`, value: "uploads" },
          { label: `Following (${following.length})`, value: "following" },
          { label: `Followers (${followers.length})`, value: "followers" },
        ]
      ));
  }
}
