import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VipServicesService } from '../../All_services/vip_services/vip-services.service';
@Component({
  selector: 'app-vip-rate',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vip-rate.component.html',
  styleUrl: './vip-rate.component.css'
})

export class VipRateComponent {
  vipData: any;
  constructor(private vipService: VipServicesService) { }

  ngOnInit(): void {
    this.fetchVipData();
  }

  fetchVipData() {
    this.vipService.getVip().subscribe({
      next: (data) => {
        this.vipData = data; // Store the fetched data
        console.log('VIP Data:', this.vipData); // Log the data for debugging
      },
      error: (error) => {
        console.error('Error fetching VIP data:', error); // Handle error
      }
    });
  }

}

