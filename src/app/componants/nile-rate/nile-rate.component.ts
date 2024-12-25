import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NileServiceService } from '../../All_services/nile_services/nile-service.service';
@Component({
  selector: 'app-nile-rate',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nile-rate.component.html',
  styleUrl: './nile-rate.component.css'
})
export class NileRateComponent {
  nileData: any;
  constructor(private nileService: NileServiceService) { }
  ngOnInit(): void {
    this.fetchNileData();

  }

  fetchNileData() {
    this.nileService.getNile().subscribe({
      next: (data) => {
        this.nileData = data; // Store the fetched data
        console.log('VIP Data:', this.nileData); // Log the data for debugging
      },
      error: (error) => {
        console.error('Error fetching VIP data:', error); // Handle error
      }
    });
  }

}

