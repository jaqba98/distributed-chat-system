import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-rooms-page',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.scss',
})
export class RoomsPageComponent implements OnInit {
  customers!: Customer[];

  constructor(
    private customerService: CustomerService,
    private readonly http: HttpClient
  ) {}

  ngOnInit() {
    this.customerService
      .getCustomersLarge()
      .then((customers) => (this.customers = customers));
    this.http.get('http://localhost:3002/get-rooms').subscribe((response) => {
      console.log(response);
    });
  }
}
