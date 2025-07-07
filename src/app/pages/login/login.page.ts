import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  email = '';

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {}

  async handleLogin(event: any) {
    event.preventDefault()
    const loader = await this.supabase.createLoader()
    await loader.present()

    if (!this.validateEmail(this.email)) {
    await this.supabase.createNotice('Invalid email format')
    return
  }



    try {
      const { error } = await this.supabase.signIn(this.email)
      if (error) {
        throw error
      }
      await loader.dismiss()
      await this.supabase.createNotice('Check your email for the login link!')
    } catch (error: any) {
      await loader.dismiss()
      await this.supabase.createNotice(error.error_description || error.message)
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email.toLowerCase())
  }

  goUserPage(){
    this.router.navigate(['/users'])
  }
}
