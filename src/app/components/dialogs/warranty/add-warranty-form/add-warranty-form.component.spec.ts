import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarrantyFormComponent } from './add-warranty-form.component';

describe('AddWarrantyFormComponent', () => {
  let component: AddWarrantyFormComponent;
  let fixture: ComponentFixture<AddWarrantyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWarrantyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWarrantyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
