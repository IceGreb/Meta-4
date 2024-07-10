import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinBrowseComponent } from './protein-browse.component';

describe('ProteinBrowseComponent', () => {
  let component: ProteinBrowseComponent;
  let fixture: ComponentFixture<ProteinBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProteinBrowseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProteinBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
