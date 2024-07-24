import { TestBed } from '@angular/core/testing';

import { UserDetailsApiService } from './user-details-api.service';

describe('UserDetailsApiService', () => {
  let service: UserDetailsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
