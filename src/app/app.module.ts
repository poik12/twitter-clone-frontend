import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollingModule } from '@angular/cdk/scrolling';

// Material
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MaterialModule } from './shared/material.module';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';

// Components
import { AppComponent } from './app.component';
// Login page
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SignInDialogComponent } from './components/auth/sign-in-dialog/sign-in-dialog.component';
import { SignUpDialogComponent } from './components/auth/sign-up-dialog/sign-up-dialog.component';
// Main page
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { TweetboxComponent } from './components/tweetbox/tweetbox.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './components/feed/home/home.component';
import { ExploreComponent } from './components/feed/explore/explore.component';
import { ProfileComponent } from './components/feed/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { PostDetailsComponent } from './components/feed/post-details/post-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { PostParametersComponent } from './components/post/post-parameters/post-parameters.component';
import { SignUpWidgetComponent } from './components/widgets/sign-up-widget/sign-up-widget.component';

// Twitter widgets
import { NgxTweetModule } from "ngx-tweet";
import { ImagesWidgetComponent } from './components/widgets/images-widget/images-widget.component';
import { MostPopularWidgetComponent } from './components/widgets/most-popular-widget/most-popular-widget.component';
import { MayLikeWidgetComponent } from './components/widgets/may-like-widget/may-like-widget.component';
import { ProfileBlockComponent } from './components/post/profile-block/profile-block.component';
import { EditProfileDialogComponent } from './components/feed/profile/edit-profile-dialog/edit-profile-dialog.component';
import { ProgressBarInterceptorService } from './interceptors/progress-bar-interceptor/progress-bar-interceptor.service';
import { NotificationComponent } from './components/notification/notification.component';
import { TokenInterceptorService } from './interceptors/token-interceptor/token-interceptor.service';
import { UploadImageDialogComponent } from './components/tweetbox/upload-image-dialog/upload-image-dialog.component';
import { FullSizeImageDialogComponent } from './components/post/full-size-image-dialog/full-size-image-dialog.component';
import { MessagesComponent } from './components/feed/messages/messages.component';
import { MessagesSidebarComponent } from './components/feed/messages/messages-sidebar/messages-sidebar.component';
import { MessagesChatComponent } from './components/feed/messages/messages-chat/messages-chat.component';
import { SearchBarComponent } from './components/widgets/search-bar/search-bar.component';
import { FollowersDialogComponent } from './components/feed/profile/followers-dialog/followers-dialog.component';


const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    LoginComponent,
    SidebarComponent,
    HomeComponent,
    WidgetsComponent,
    TweetboxComponent,
    PostComponent,
    ProfileComponent,
    SignInDialogComponent,
    SignUpDialogComponent,
    ExploreComponent,
    RegisterComponent,
    FooterComponent,
    AuthDialogComponent,
    PostDetailsComponent,
    CommentComponent,
    PostParametersComponent,
    SignUpWidgetComponent,
    ImagesWidgetComponent,
    MostPopularWidgetComponent,
    MayLikeWidgetComponent,
    ProfileBlockComponent,
    EditProfileDialogComponent,
    NotificationComponent,
    UploadImageDialogComponent,
    FullSizeImageDialogComponent,
    MessagesComponent,
    MessagesSidebarComponent,
    MessagesChatComponent,
    SearchBarComponent,
    FollowersDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    NgxWebstorageModule.forRoot(),
    NgxTweetModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    // AngularFileUploaderModule,
    NgxFileDropModule,
    InfiniteScrollModule,
    ScrollingModule,

    TextareaAutosizeModule,
  ],

  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ProgressBarInterceptorService, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
