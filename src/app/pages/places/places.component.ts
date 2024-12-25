import { Component } from '@angular/core';
import { HeaderplacesComponent} from '../../componants/headerplaces/headerplaces.component';
import { CardsComponent } from '../../componants/cards/cards.component';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CardsComponent ,HeaderplacesComponent],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css'
})
export class PlacesComponent {

}
