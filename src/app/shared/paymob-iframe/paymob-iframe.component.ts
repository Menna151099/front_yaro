import { Component, Input } from '@angular/core';
import { SafeUrlPipe } from '../../safe-url.pipe';

@Component({
  selector: 'app-paymob-iframe',
  standalone: true,
  imports: [SafeUrlPipe],
  template: `
    <div ngIf="iframeUrl">
      <h3>Complete Your Payment</h3>
      <iframe
        [src]="iframeUrl | safeUrl"
        width="100%"
        height="600"
        frameborder="0"
        allowfullscreen>
      </iframe>
    </div>
  `,
  styleUrls: ['./paymob-iframe.component.css'],
})
export class PaymobIframeComponent {
  @Input() iframeUrl!: string;
}
