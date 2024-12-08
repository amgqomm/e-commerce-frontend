import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardWithCartComponent } from './product-card-with-cart.component';

describe('ProductCardWithCartComponent', () => {
  let component: ProductCardWithCartComponent;
  let fixture: ComponentFixture<ProductCardWithCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardWithCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardWithCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
