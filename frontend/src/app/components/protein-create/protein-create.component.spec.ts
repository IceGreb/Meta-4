import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinCreateComponent } from './protein-create.component';

describe('ProteinCreateComponent', () => {
  let component: ProteinCreateComponent;
  let fixture: ComponentFixture<ProteinCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProteinCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProteinCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
