import { Component } from '@angular/core';
import {HeaderplacesComponent} from "../../componants/headerplaces/headerplaces.component";
import { CairoDescribeComponent } from "../../componants/cairo-describe/cairo-describe.component";
@Component({
  selector: 'app-cairo',
  standalone: true,
  imports: [
    HeaderplacesComponent,
    CairoDescribeComponent
],
  templateUrl: './cairo.component.html',
  styleUrl: './cairo.component.css'
})
export class CairoComponent {

}
