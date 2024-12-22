import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { CustomerService } from './customer.service';
import { Customer } from './customer';

@Component({
  selector: 'lib-rooms-page',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.scss',
})
export class RoomsPageComponent implements OnInit {
  customers!: Customer[];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService
      .getCustomersLarge()
      .then((customers) => (this.customers = customers));
  }
}
