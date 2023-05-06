import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavwsComponent } from './navws.component';

describe('NavwsComponent', () => {
  let component: NavwsComponent;
  let fixture: ComponentFixture<NavwsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavwsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
