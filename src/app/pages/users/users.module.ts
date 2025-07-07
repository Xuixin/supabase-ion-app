import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './users-routing.module';

import { UsersPage } from './users.page';
import { UserDetailComponent } from 'src/app/components/user-detail/user-detail.component';
import { FormUserComponent } from 'src/app/components/form-user/form-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule
  ],
  declarations: [UsersPage, UserDetailComponent, FormUserComponent]
})
export class UsersPageModule {}
