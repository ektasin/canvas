import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportToPNGComponent } from './export-to-png.component';

describe('ExportToPNGComponent', () => {
  let component: ExportToPNGComponent;
  let fixture: ComponentFixture<ExportToPNGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportToPNGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportToPNGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
