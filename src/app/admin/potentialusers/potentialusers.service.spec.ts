import { TestBed, inject } from '@angular/core/testing';

import { PotentialusersService } from './potentialusers.service';

describe('PotentialusersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PotentialusersService]
    });
  });

  it('should be created', inject([PotentialusersService], (service: PotentialusersService) => {
    expect(service).toBeTruthy();
  }));
});
