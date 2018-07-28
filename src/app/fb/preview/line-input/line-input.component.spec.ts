import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineInputComponent } from './line-input.component';

describe('LineInputComponent', () => {
  let component: LineInputComponent;
  let fixture: ComponentFixture<LineInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
