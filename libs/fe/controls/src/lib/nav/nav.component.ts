import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'lib-nav',
  standalone: true,
  imports: [CommonModule, Menubar],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        routerLink: '/logout',
      },
      {
        label: 'Rooms',
        icon: 'pi pi-comments',
        routerLink: '/dashboard/rooms',
      },
      {
        label: 'Create room',
        icon: 'pi pi-plus-circle',
        routerLink: '/dashboard/create-room',
      },
    ];
  }
}
