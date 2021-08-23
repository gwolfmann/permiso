import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Per0Component } from './per0.component';

describe('Per0Component', () => {
  let component: Per0Component;
  let fixture: ComponentFixture<Per0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Per0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Per0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
