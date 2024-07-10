import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinUpdateComponent } from './protein-update.component';

describe('ProteinUpdateComponent', () => {
  let component: ProteinUpdateComponent;
  let fixture: ComponentFixture<ProteinUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProteinUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProteinUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
