import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DomService } from './dom.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public username: string = 'admin';
  public password: string = '123456';

  constructor(private router: Router, private dom: DomService) {}

  login(userLogin: any) {
    if (userLogin.username === 'admin' && userLogin.password == '123456') {
      localStorage.setItem('user-token', 'true');
      this.router.navigate(['/employee-list'], { replaceUrl: true });
      this.dom.showToastMessage('Login Sukses');
    } else {
      this.dom.showToastMessage(
        'Login Gagal. Periksa kembali ID dan Password Anda'
      );
    }
  }

  logout() {
    localStorage.removeItem('user-token');
    this.router.navigate(['/login'], { replaceUrl: true });
    this.dom.showToastMessage('Logout Sukses');
  }
}
