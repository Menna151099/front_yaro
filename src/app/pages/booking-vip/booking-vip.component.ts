import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderbookingComponent } from "../../componants/headerbooking/headerbooking.component";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../All_services/booking_services/Booking.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-booking-vip',
  standalone: true,
  imports: [HeaderbookingComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './booking-vip.component.html',
  styleUrls: ['./booking-vip.component.css']
})
export class BookingVipComponent implements OnInit {
  bookingForm: FormGroup;
  totalPrice = 0;
  isLoading = false;
  tourTitle: string = '';
  tourPrice: number = 0;
  private publicKey = environment.publicKey;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
  ) {
    this.bookingForm = this.fb.group({
      paymentName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cellPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      adults: [1, [Validators.required, Validators.min(1)]],
      additionalQueries: [''],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      time: [new Date().toLocaleTimeString(), Validators.required],
    });

    this.bookingForm.valueChanges.subscribe(() => this.calculatePrice());
  }

  ngOnInit(): void {
    // Retrieve the title and price from the route parameters
    this.activatedRoute.params.subscribe(params => {
      this.tourTitle = params['title'];
      this.tourPrice = +params['price']; // Convert price to a number
      this.totalPrice = this.tourPrice; // Set initial total price based on the tour price
      console.log('Title:', this.tourTitle);
      console.log('Price:', this.tourPrice);
    });
  }

  calculatePrice(): void {
    const { adults } = this.bookingForm.value;
    const pricePerAdult = this.tourPrice; // Use the price from the route

    // Calculate total price based on the number of adults
    this.totalPrice = adults * pricePerAdult;
  }

  onSubmit(): void {
    console.log('Form Submitted:', this.bookingForm.value); // Log form values
    console.log('Total Price:', this.totalPrice); // Log total price

    if (this.bookingForm.valid) {
      this.isLoading = true;

      const bookingData = {
        ...this.bookingForm.value,
        amount: this.totalPrice,
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').user?.id,
        tourName: this.tourTitle
      };

      console.log('Booking Data:', bookingData); // Log booking data

      this.bookingService.createBooking(bookingData).subscribe({
        next: (response) => {
          console.log('Booking added successfully:', response);

          const clientSecret = response.client_secret; // Ensure this comes from your backend response

          // Build the Paymob checkout URL
          const checkoutUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${this.publicKey}&clientSecret=${clientSecret}`;

          // Redirect to the Paymob checkout page
          window.location.href = checkoutUrl;
          this.bookingForm.reset(); // Reset the form after successful booking
          this.totalPrice = 0; // Reset total price
        },
        error: (err) => {
          console.error('Booking error:', err); // Handle error
        },
        complete: () => {
          this.isLoading = false; // Stop loading
        }
      });
    } else {
      console.error('Form is invalid'); // Handle form invalid case
    }
  }
}
