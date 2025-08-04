import { Component, computed, inject, resource } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';

@Component({
  selector: 'app-doctor',
  imports: [
    CardSkeletonComponent,
    FooterComponent,
    CardComponent,
  ],
  templateUrl: './doctor.component.html',
})
export class DoctorComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle("Doctors List");
    this.meta.updateTag({
      name: 'description',
      content:
        "Doctors List",
    });
    this.meta.updateTag({ property: 'og:title', content: "Doctors List" });
    this.meta.updateTag({
      property: 'og:description',
      content:
        "Doctors List",
    });
  }

  private readonly apiService = inject(ApiService);

  doctors = resource({
    loader: () => this.apiService.getDoctors(),
  });

  isLoading = computed(() => this.doctors.isLoading());
}
