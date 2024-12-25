import { Component } from '@angular/core';
import { VipheaderComponent } from '../../componants/vipheader/vipheader.component';
import { VipdetailComponent } from '../../componants/vipdetail/vipdetail.component';
import { VipphotoComponent } from '../../componants/vipphoto/vipphoto.component';
@Component({
  selector: 'app-vip',
  standalone: true,
  imports: [
    VipheaderComponent, VipdetailComponent,
    VipphotoComponent
],
  templateUrl: './vip.component.html',
  styleUrl: './vip.component.css'
})
export class VipComponent {

}
