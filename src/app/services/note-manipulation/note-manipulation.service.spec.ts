import { TestBed, inject } from '@angular/core/testing';

import { NoteManipulationService } from './note-manipulation.service';

describe('NoteManipulationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteManipulationService]
    });
  });

  it('should be created', inject([NoteManipulationService], (service: NoteManipulationService) => {
    expect(service).toBeTruthy();
  }));
});
