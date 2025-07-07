import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';
import { MenuController, IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-nav-modal',
  templateUrl: './app-nav-modal.component.html',
  styleUrls: ['./app-nav-modal.component.scss'],
  standalone: false,

})
export class NavModalComponent {
  public menuItems = [
    {
      title: 'บัญชีผู้ใช้',
      url: '/account',
      icon: 'person',
      description: 'ข้อมูลบัญชีผู้ใช้',
    },
    {
      title: 'ตั้งค่า',
      url: '/setting',
      icon: 'settings',
      description: 'ปรับแต่งแอปพลิเคชัน',
    },
    { title: 'ผู็ใช้', url: '/users', icon: 'user', description: 'z^h.=h' },
    {
      title: 'ออกจากระบบ',
      url: '',
      icon: 'log-out-outline',
      description: 'ออกจากระบบ',
      action: 'logout',
    },
  ];

  constructor(
    private menu: MenuController,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async onMenuClick(item: any) {
    if (item.action === 'logout') {
      const loader = await this.supabase.createLoader();
      await loader.present();
      this.menu.close();
      this.supabase.signOut();
      loader.dismiss();
      this.router.navigate(['/login']);
    } else if (item.url) {
      this.router.navigate([item.url]);
    }
  }
}
