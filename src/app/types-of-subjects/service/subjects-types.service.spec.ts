import { TestBed } from '@angular/core/testing';

import { SubjectsTypesService } from './subjects-types.service';

describe('SubjectsTypesService', () => {
  let service: SubjectsTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectsTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
