import { Component } from '@angular/core';
import { IonNav, ModalController, NavController } from '@ionic/angular';
import { colorPaletteOutline, sunnyOutline, moonOutline, phonePortraitOutline } from 'ionicons/icons';
import { AdvancedThemeSettingsComponent } from '../advanced-theme-settings/advanced-theme-settings.component';

@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.component.html',
  styleUrls: ['./theme-settings.component.scss'],
  standalone: false
})
export class ThemeSettingsComponent {

  nextPage = AdvancedThemeSettingsComponent

  themeSettings = {
    mode: 'light',
    primaryColor: '#3880ff',
    fontSize: 'medium'
  };

  colorPaletteOutline = colorPaletteOutline;
  sunnyOutline = sunnyOutline;
  moonOutline = moonOutline;
  phonePortraitOutline = phonePortraitOutline;


  colorOptions = [
    { name: 'Blue', value: '#3880ff' },
    { name: 'Green', value: '#2dd36f' },
    { name: 'Red', value: '#eb445a' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' }
  ];

  constructor(
    private navCtrl: NavController,
    private nav: IonNav,
    private modal : ModalController
       )     {
    this.loadThemeSettings();
  }

  loadThemeSettings() {
    // Load from localStorage or default values
    const savedSettings = localStorage.getItem('themeSettings');
    if (savedSettings) {
      this.themeSettings = JSON.parse(savedSettings);
    }
    this.applyTheme();
  }

  onThemeModeChange(event: any) {
    this.themeSettings.mode = event.detail.value;
    this.saveAndApplyTheme();
  }

  onColorChange(color: string) {
    this.themeSettings.primaryColor = color;
    this.saveAndApplyTheme();
  }

  onFontSizeChange(event: any) {
    this.themeSettings.fontSize = event.detail.value;
    this.saveAndApplyTheme();
  }

  saveAndApplyTheme() {
    localStorage.setItem('themeSettings', JSON.stringify(this.themeSettings));
    this.applyTheme();
  }

  applyTheme() {
    const body = document.body;

    // Apply theme mode
    if (this.themeSettings.mode === 'dark') {
      body.classList.add('dark');
    } else if (this.themeSettings.mode === 'light') {
      body.classList.remove('dark');
    } else {
      // Auto mode - check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        body.classList.add('dark');
      } else {
        body.classList.remove('dark');
      }
    }

    // Apply primary color
    document.documentElement.style.setProperty('--ion-color-primary', this.themeSettings.primaryColor);

    // Apply font size
    body.classList.remove('font-small', 'font-medium', 'font-large');
    body.classList.add(`font-${this.themeSettings.fontSize}`);
  }

  closeModal(){
    this.modal.dismiss();
  }

  goToAdvancedSettings() {
    this.nav.push(this.nextPage)
  }
  resetToDefault() {
    this.themeSettings = {
      mode: 'light',
      primaryColor: '#3880ff',
      fontSize: 'medium'
    };
    this.saveAndApplyTheme();
  }
}
