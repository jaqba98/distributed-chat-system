import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeGuardComponent } from './fe-guard.component';

describe('FeGuardComponent', () => {
  let component: FeGuardComponent;
  let fixture: ComponentFixture<FeGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeGuardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
