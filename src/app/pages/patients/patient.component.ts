import { Component, computed, inject, resource } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';

@Component({
  selector: 'app-patient',
  imports: [
    CardSkeletonComponent,
    FooterComponent,
    CardComponent,
  ],
  templateUrl: './patient.component.html',
})
export class PatientComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle("Patients List");
    this.meta.updateTag({
      name: 'description',
      content:
        "Patients List",
    });
    this.meta.updateTag({ property: 'og:title', content: "Patients List" });
    this.meta.updateTag({
      property: 'og:description',
      content:
        "Patients List",
    });
  }

  private readonly apiService = inject(ApiService);

  patients = resource({
    loader: () => this.apiService.getPatients(),
  });

  isLoading = computed(() => this.patients.isLoading());
}
