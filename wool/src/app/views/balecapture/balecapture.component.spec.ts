import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalecaptureComponent } from './balecapture.component';

describe('BalecaptureComponent', () => {
  let component: BalecaptureComponent;
  let fixture: ComponentFixture<BalecaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalecaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalecaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
