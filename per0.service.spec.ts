import { TestBed } from '@angular/core/testing';

import { Per0Service } from './per0.service';

describe('Per0Service', () => {
  let service: Per0Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Per0Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
