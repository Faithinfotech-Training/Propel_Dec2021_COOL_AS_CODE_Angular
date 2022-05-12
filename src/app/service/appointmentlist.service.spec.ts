import { TestBed } from '@angular/core/testing';

import { AppointmentlistService } from './appointmentlist.service';

describe('AppointmentlistService', () => {
  let service: AppointmentlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
