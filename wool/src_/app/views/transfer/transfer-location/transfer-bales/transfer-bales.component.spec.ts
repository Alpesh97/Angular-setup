import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferBalesComponent } from './transfer-bales.component';

describe('TransferBalesComponent', () => {
  let component: TransferBalesComponent;
  let fixture: ComponentFixture<TransferBalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferBalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferBalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
