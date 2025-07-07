import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { IonModal, IonNav } from '@ionic/angular';
import {
  chevronForwardOutline,
  personOutline,
  lockClosedOutline,
  colorPaletteOutline
} from 'ionicons/icons';

import { ThemeSettingsComponent } from 'src/app/components/settings/theme-settings/theme-settings.component';

@Component({
  selector: 'app-settings',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: false,
})
export class SettingPage implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  @ViewChild('nav') nav!: IonNav;

  // icon
  chevronForwardOutline = chevronForwardOutline;
  personOutline = personOutline;
  lockClosedOutline = lockClosedOutline;
  colorPaletteOutline = colorPaletteOutline;

  private pageMap: Record<string, Type<any>> = {
    theme: ThemeSettingsComponent
  };

  ngOnInit(): void {}

  async openModal(type: string) {
    const component = this.pageMap[type];
    if (component) {
      await this.modal.present();
      await this.nav.setRoot(component);
    }
  }
}
