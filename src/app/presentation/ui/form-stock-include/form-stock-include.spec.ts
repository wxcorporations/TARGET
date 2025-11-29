import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStockInclude } from './form-stock-include';

describe('FormStockInclude', () => {
  let component: FormStockInclude;
  let fixture: ComponentFixture<FormStockInclude>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStockInclude]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStockInclude);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
