import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { ThemeSettingsComponent } from 'src/app/components/settings/theme-settings/theme-settings.component';
import { AdvancedThemeSettingsComponent } from 'src/app/components/settings/advanced-theme-settings/advanced-theme-settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPageRoutingModule
  ],
  declarations: [SettingPage, ThemeSettingsComponent, AdvancedThemeSettingsComponent]
})
export class SettingPageModule {}
