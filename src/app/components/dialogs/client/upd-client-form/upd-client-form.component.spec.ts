import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdClientFormComponent } from './upd-client-form.component';

describe('UpdClientFormComponent', () => {
  let component: UpdClientFormComponent;
  let fixture: ComponentFixture<UpdClientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdClientFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
