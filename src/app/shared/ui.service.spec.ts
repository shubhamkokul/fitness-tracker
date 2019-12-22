import { TestBed } from '@angular/core/testing';

import { UIService } from './u-i.service';

describe('UiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UIService = TestBed.get(UIService);
    expect(service).toBeTruthy();
  });
});
