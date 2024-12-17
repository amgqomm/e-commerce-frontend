import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewProductComponent } from './new-product.component';
import { of } from 'rxjs';
import { ProductService } from '../../../services/product-service';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InplaceModule } from 'primeng/inplace';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockProductService {
  createProduct(product: any) {
    return of({ success: true, product });
  }
}

describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        InputTextareaModule,
        InplaceModule,
        InputSwitchModule,
        DropdownModule,
        RatingModule,
        CommonModule,
        HttpClientTestingModule,
      ],
      declarations: [NewProductComponent],
      providers: [
        { provide: ProductService, useClass: MockProductService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize product with default price as 0', () => {
    expect(component.product.price).toBe(0);
  });

  it('should call ProductService.createProduct on onSubmit', () => {
    const spy = spyOn(productService, 'createProduct').and.callThrough();
    component.product.name = 'Test Product';
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith(component.product);
  });

  it('should reset the form on onDiscard', () => {
    component.product.name = 'Test';
    component.product.category = 'Category 1';
    component.onDiscard();
    expect(component.product.name).toBe('');
    expect(component.product.category).toBe('');
    expect(component.product.price).toBe(0);
    expect(component.product.imageUrls.length).toBe(0);
  });

  it('should add image URLS on addInput', () => {
    component.product.imageUrls = ['Image1'];
    component.addInput();
    expect(component.addImageUrls.length).toBe(1);
    expect(component.product.imageUrls.length).toBe(2);
  });


  it('should reset image upload on uploadImage', () => {
    component.product.imageUrls = ['Image1', 'Image2'];
    component.uploadImage();
    expect(component.product.imageUrls.length).toBe(2);
    expect(component.displayStyle).toBe('none');
  });
});
