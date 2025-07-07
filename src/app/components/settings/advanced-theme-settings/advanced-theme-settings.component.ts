import { Component, OnInit } from '@angular/core';
import { IonNav, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-advanced-theme-settings',
  templateUrl: './advanced-theme-settings.component.html',
  styleUrls: ['./advanced-theme-settings.component.scss'],
  standalone: false
})
export class AdvancedThemeSettingsComponent  implements OnInit {

  constructor(
    private modal: ModalController,
    private nav: IonNav
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modal.dismiss();
  }

  goBack() {
    this.nav.pop();
  }

}
