import { NotificationsComponent } from './components/feed/notifications/notifications.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/feed/user-profile/profile.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HomeComponent } from './components/feed/home/home.component';
import { ExploreComponent } from './components/feed/explore/explore.component';
import { AuthGuard } from './components/auth/auth.guard';
import { TweetDetailsComponent } from './components/feed/tweet-details/tweet-details.component';
import { MessagesComponent } from './components/feed/messages/messages.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: '', component: MainPageComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'profile/:username', component: ProfileComponent },
      { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
      { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
      { path: 'tweet-details/:id', component: TweetDetailsComponent, canActivate: [AuthGuard] },
      { path: 'messages', component: MessagesComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
