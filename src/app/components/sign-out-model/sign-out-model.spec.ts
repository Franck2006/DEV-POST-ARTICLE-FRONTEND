import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutModel } from './sign-out-model';

describe('SignOutModel', () => {
  let component: SignOutModel;
  let fixture: ComponentFixture<SignOutModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignOutModel],
    }).compileComponents();

    fixture = TestBed.createComponent(SignOutModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
