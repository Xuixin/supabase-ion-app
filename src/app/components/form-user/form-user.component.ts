import { Component, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  standalone: false
})
export class FormUserComponent {
  @Input() user: any;

  username: string = '';
  website: string = '';

  constructor(
    private supabase: SupabaseService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.user) {
      this.username = this.user.username;
      this.website = this.user.website;
    }
  }

  async updateUser() {
    const loader = await this.supabase.createLoader();
    await loader.present();

    try {
      const { error } = await this.supabase.updateProfile({
        username: this.username,
        website: this.website,
        avatar_url: this.user.avatar_url || '',
      });

      if (error) throw error;

      await this.supabase.createNotice('อัปเดตสำเร็จ');
      this.navCtrl.back(); // กลับไปหน้า User Detail
    } catch (err: any) {
      alert(err.message);
    } finally {
      loader.dismiss();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(); // เผื่อกดปิดทั้งหมด
  }
}
