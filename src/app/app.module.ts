import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { WebsiteLayoutComponent } from './layouts/website-layout.component';
import { WebsiteComponent } from './website/website.component';
import { ScriptService } from './script.service';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { MainLayoutComponent } from './layouts/main-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    WebsiteLayoutComponent,
    WebsiteComponent,
    LoginComponent,
    MainLayoutComponent
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    ToastrModule.forRoot({ timeOut: 3000, positionClass: 'toast-top-right', preventDuplicates: true, closeButton: true }),
    ToastContainerModule,
    RouterModule.forRoot([
      {
        path: '',
        component: WebsiteLayoutComponent,
        children: [
          {
            path: '',
            component: WebsiteComponent
          }
        ]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: MainLayoutComponent,
        children: [{
          path: '',
          loadChildren: './layouts/main-layout.module#MainLayoutModule'
        }],
        canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: '' }
    ], { onSameUrlNavigation: 'reload' })
  ],
  providers: [
    ScriptService,
    AuthGuard,
    AuthenticationService,
    UserService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
