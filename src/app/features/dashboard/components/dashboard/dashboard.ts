import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User } from '../../../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  sidebarOpen: boolean = true;
  pageTitle: string = 'Dashboard';

  constructor(
    public router: Router,
    private authService: Auth
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  private checkScreenSize() {
    this.sidebarOpen = window.innerWidth > 768;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
