import { TestBed } from '@angular/core/testing';

import { BrowserCapabilitiesService } from './browser-capabilities.service';

describe('BrowserCapabilitiesService', () => {
  let service: BrowserCapabilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserCapabilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
