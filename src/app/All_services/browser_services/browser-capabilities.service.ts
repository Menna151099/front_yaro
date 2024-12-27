import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class BrowserCapabilitiesService {
  constructor(private deviceService: DeviceDetectorService) {}

  getBrowserInfo() {
    return {
      browser: this.deviceService.browser,
      os: this.deviceService.os,
      deviceType: this.deviceService.device,
      isMobile: this.deviceService.isMobile(),
      isTablet: this.deviceService.isTablet(),
      isDesktop: this.deviceService.isDesktop(),
    };
  }

  isFeatureSupported(feature: string): boolean {
    return feature in window;
  }

  checkCapabilities(): boolean {
    const browserInfo = this.getBrowserInfo();
    return browserInfo.isDesktop;
  }
}

