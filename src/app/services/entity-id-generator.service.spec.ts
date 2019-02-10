import { TestBed } from '@angular/core/testing';

import { EntityIdGeneratorService } from './entity-id-generator.service';

describe('EntityIdGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityIdGeneratorService = TestBed.get(EntityIdGeneratorService);
    expect(service).toBeTruthy();
  });
});
