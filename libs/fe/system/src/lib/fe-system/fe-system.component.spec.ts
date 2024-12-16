import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeSystemComponent } from './fe-system.component';

describe('FeSystemComponent', () => {
  let component: FeSystemComponent;
  let fixture: ComponentFixture<FeSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeSystemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
