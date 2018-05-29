import { TestBed, inject } from '@angular/core/testing';

import { StripHtmlService } from './strip-html.service';

describe('StripHtmlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StripHtmlService]
    });
  });

  it('should be created', inject([StripHtmlService], (service: StripHtmlService) => {
    expect(service).toBeTruthy();
  }));
});
