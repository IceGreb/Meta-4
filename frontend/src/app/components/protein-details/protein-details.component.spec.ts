import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinDetailsComponent } from './protein-details.component';

describe('ProteinDetailsComponent', () => {
  let component: ProteinDetailsComponent;
  let fixture: ComponentFixture<ProteinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProteinDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProteinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
