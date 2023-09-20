import { PasswordStrengthDirective } from './directives/password-strength.directive';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListContainerComponent } from './user-list-container/user-list-container.component';
import { CreateUpdateUserModalComponent } from './create-update-user-modal/create-update-user-modal.component';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule }   from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { NotificationsComponent } from './notifications/notifications.component';
import { UsernameUniqueDirective } from './directives/username-unique.directive';


@NgModule({
  declarations: [
    AppComponent,
    UserListContainerComponent,
    CreateUpdateUserModalComponent,
    UserListComponent,
    PasswordStrengthDirective,
    MatchPasswordDirective,
    NotificationsComponent,
    UsernameUniqueDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
