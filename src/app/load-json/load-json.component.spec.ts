import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadJsonComponent } from './load-json.component';

describe('LoadJsonComponent', () => {
  let component: LoadJsonComponent;
  let fixture: ComponentFixture<LoadJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
