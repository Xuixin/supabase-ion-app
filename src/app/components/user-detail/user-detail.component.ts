import { Component, Input } from '@angular/core';
import { ModalController, IonNav } from '@ionic/angular';
import { FormUserComponent } from '../form-user/form-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: false
})
export class UserDetailComponent {
  @Input() user: any;

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async goToEdit() {
  const modal = await this.modalCtrl.create({
    component: FormUserComponent,
    componentProps: { user: this.user },
    showBackdrop: true,
    backdropDismiss: false,
  });

  await modal.present(); // <<<< สำคัญมาก
}
}
