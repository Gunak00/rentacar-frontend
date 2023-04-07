import { TestBed } from '@angular/core/testing';

import { ProxyEditCarService } from './proxy-edit-car.service';

describe('ProxyEditCarService', () => {
  let service: ProxyEditCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProxyEditCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
