import { TestBed } from '@angular/core/testing';

import { TitleDashboardService } from './title-dashboard.service';

describe('TitleDashboardService', () => {
  let service: TitleDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
