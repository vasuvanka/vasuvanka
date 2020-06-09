import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIpComponent } from './my-ip.component';

describe('MyIpComponent', () => {
  let component: MyIpComponent;
  let fixture: ComponentFixture<MyIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
