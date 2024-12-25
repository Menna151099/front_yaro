import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderbookingComponent } from "../../componants/headerbooking/headerbooking.component";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../All_services/booking_services/Booking.service';
import { TourService } from '../../All_services/tour_services/tour.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [HeaderbookingComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  tourId: string | null = null;
  tourDetails: any;
  totalPrice = 0;
  private publicKey = environment.publicKey;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private tourService: TourService,

  ) {
    // Initialize the booking form.
    this.bookingForm = this.fb.group({
      paymentName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      arrivalDate: ['', Validators.required],
      cellPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]], // Example validation
      departureDate: ['', Validators.required],
      tripLocation: ['', Validators.required],
      adults: [1, [Validators.required, Validators.min(1)]],
      children6To11: [0, [Validators.min(0)]],
      childrenUnder6: [0, [Validators.min(0)]],
      transportation: ['', Validators.required],
      guide: ['', Validators.required],
      car: ['', Validators.required],
      additionalQueries: [''],
      date: [new Date().toISOString().split('T')[0], Validators.required], // Default current date
      time: [new Date().toLocaleTimeString(), Validators.required], // Default current time
    });

    // Recalculate price whenever the form changes.
    this.bookingForm.valueChanges.subscribe(() => this.calculatePrice());
  }

  ngOnInit(): void {
    // Get the ID from the route parameters.
    this.tourId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.tourId) {
      this.loadTourDetails(this.tourId);
    } else {
      console.error('No tour ID provided in the route parameters.');
      alert('Invalid tour ID.');
      this.router.navigate(['/']); // Redirect to home or another page if ID is missing.
    }
  }

  /**
   * Fetches tour details using the tour ID.
   * @param id Tour ID
   */
  loadTourDetails(id: string): void {
    this.tourService.getTourById(id).subscribe({
      next: (data) => {
        this.tourDetails = data;
        console.log('Tour Details Loaded:', this.tourDetails);

        // Pre-fill the trip location from the loaded details.
        this.bookingForm.patchValue({ tripLocation: this.tourDetails.city });
      },
      error: (err) => {
        console.error('Error fetching tour details:', err);
        alert('Failed to load tour details.');
      },
    });
  }

  /**
   * Calculates the total price based on the tour details and user inputs.
   */
  calculatePrice(): void {
    if (!this.tourDetails || !this.tourDetails.prices) {
      this.totalPrice = 0;
      return;
    }

    const { prices } = this.tourDetails;
    const { adults = 0, children6To11 = 0, childrenUnder6 = 0, transportation = '' } = this.bookingForm.value;

    const pricingKey = transportation === 'privateTourWithLunch' ? 'privateTourWithLunch' : 'privateTourWithoutLunch';
    const pricing = prices[pricingKey] || { single: 0, childSixToEleven: 0, childUnderSix: 0 };

    const adultPrice = adults * pricing.single;
    const child6To11Price = children6To11 * pricing.childSixToEleven;
    const childUnder6Price = childrenUnder6 * pricing.childUnderSix;

    this.totalPrice = adultPrice + child6To11Price + childUnder6Price;
  }


  /**
   * Handles the form submission.
   */
  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingData = {
        ...this.bookingForm.value,
        tourName: this.tourDetails.title,
        amount: this.totalPrice,
        userId: JSON.parse(localStorage.getItem('currentUser') || '{}').user?.id,
      };

      this.bookingService.createBooking(bookingData).subscribe({
        next: (response: any) => {
          console.log('Booking added successfully:', response);
          const clientSecret = response.client_secret; // Ensure this comes from your backend response

          // Build the Paymob checkout URL
          const checkoutUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${this.publicKey}&clientSecret=${clientSecret}`;

          // Redirect to the Paymob checkout page
          window.location.href = checkoutUrl;
        },
        error: (error) => {
          console.error('Error adding booking:', error);
          alert('Failed to add booking.');
        },
      });
    } else {
      this.bookingForm.markAllAsTouched();
      // console.log('Form Invalid:', this.bookingForm.errors);
      alert('Please fill all required fields correctly.');
    }
  }

}
