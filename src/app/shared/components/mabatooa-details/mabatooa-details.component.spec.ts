import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MabatooaDetailsComponent } from './mabatooa-details.component';

describe('MabatooaDetailsComponent', () => {
  let component: MabatooaDetailsComponent;
  let fixture: ComponentFixture<MabatooaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MabatooaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MabatooaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
