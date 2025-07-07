import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: false,
})
export class UsersPage implements OnInit {
  users: any = [];

  constructor(private supabase: SupabaseService) {}

  ngOnInit() {
    this.getUsers();
  }

  typeOf(val: any): string {
    return typeof val;
  }

  async getUsers() {
    const loader = await this.supabase.createLoader();
    try {

      loader.present();
      const { data: users, error, status } = await this.supabase.users;
      if (error && status !== 406) {
        throw error;
      }
      if (users) {
        this.users = users;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      console.log(this.users);
      loader.dismiss();

    }
  }
}
