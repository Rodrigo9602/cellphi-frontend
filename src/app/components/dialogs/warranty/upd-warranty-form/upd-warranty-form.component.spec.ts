import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdWarrantyFormComponent } from './upd-warranty-form.component';

describe('UpdWarrantyFormComponent', () => {
  let component: UpdWarrantyFormComponent;
  let fixture: ComponentFixture<UpdWarrantyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdWarrantyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdWarrantyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
