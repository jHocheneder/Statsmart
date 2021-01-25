import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Statsmart';

  public constructor(
    private titleService: Title,
    private authGuard: AuthGuard,
    private authService: AuthService) {
    this.titleService.setTitle("Statsmart");
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  isLogin(){
    return this.authGuard.isAuthenticated()
  }

  logout(){
    this.authService.logout()
  }
}
