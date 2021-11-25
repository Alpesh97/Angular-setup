import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StowageCountComponent } from './stowage-count.component';

describe('StowageCountComponent', () => {
  let component: StowageCountComponent;
  let fixture: ComponentFixture<StowageCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StowageCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StowageCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
