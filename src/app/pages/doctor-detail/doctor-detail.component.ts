import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faChevronLeft,
  faChevronRight,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-doctor-detail',
  imports: [
    FontAwesomeModule,
    FooterComponent,
  ],
  templateUrl: './doctor-detail.component.html',
  styles: ``,
})
export class DoctorDetailComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Doctor Details');
    this.meta.updateTag({
      name: 'description',
      content:
        "Doctor Details",
    });
    this.meta.updateTag({ property: 'og:title', content: 'Doctor Details' });
    this.meta.updateTag({
      property: 'og:description',
      content:
        "Doctor Details",
    });
  }

  faCartShopping = faCartShopping;
  faChevronRight = faChevronRight;
  faHeart = faHeart;
  faChevronLeft = faChevronLeft;

  private readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
 

  doctorId = signal<string>('');

  doctor = resource({
    request: () => ({ id: this.doctorId() }),
    loader: ({ request }) => this.apiService.getDoctorById(request.id),
  });
 
  isLoading = computed(() => this.doctor.isLoading());


  errorEffect = effect(() => {
    const error = this.doctor.error() as Error;
    if (error) {
      console.log(error);
    }
  });

  ngOnInit() {
    this.route.paramMap.subscribe((param) =>
      this.doctorId.set(param.get('id')!)
    );
  }
}
