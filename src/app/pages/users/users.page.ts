import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/supabase.service';
import { UserDetailComponent } from 'src/app/components/user-detail/user-detail.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: false
})
export class UsersPage implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;



  constructor(
    private supabase: SupabaseService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    await this.loadUsers();
  }


  async loadUsers() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Loading users...',
      duration: 2000
    });
    await loading.present();

    try {
      const { data, error } = await this.supabase.users;

      if (error) {
        console.error('Error loading users:', error);
        await this.showToast('Error loading users', 'danger');
        return;
      }

      this.users = data || [];
      this.filteredUsers = [...this.users];

    } catch (error) {
      console.error('Error:', error);
      await this.showToast('Failed to load users', 'danger');
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  filterUsers(event: any) {
    this.searchTerm = event.target.value || '';
    this.applyFilters();
  }



  applyFilters() {
    let filtered = [...this.users];

    // Apply search filter
    if (this.searchTerm.trim() !== '') {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        (user.full_name || user.username || '').toLowerCase().includes(searchLower) ||
        (user.email || '').toLowerCase().includes(searchLower) ||
        (user.website || '').toLowerCase().includes(searchLower)
      );
    }


    this.filteredUsers = filtered;
  }

  async openUserDetailModal(user: any) {
    const modal = await this.modalCtrl.create({
      component: UserDetailComponent,
      componentProps: { user },
      showBackdrop: true,
      backdropDismiss: false,
    });

    await modal.present();

    // Handle modal dismiss and refresh if needed
    const { data } = await modal.onWillDismiss();
    if (data && data.refresh) {
      await this.loadUsers();
    }
  }


  async viewUserDetails(user: any, event: Event) {
    event.stopPropagation();
    await this.openUserDetailModal(user);
  }
  onImageError(event: any) {
    event.target.src = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  }


  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }

  async handleRefresh(event: any) {
    await this.loadUsers();
    event.target.complete();
  }

}
