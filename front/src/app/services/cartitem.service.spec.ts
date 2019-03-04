import { TestBed } from '@angular/core/testing';

import { CartItemService } from './cartitem.service';

describe('CartItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartItemService = TestBed.get(CartItemService);
    expect(service).toBeTruthy();
  });
});
