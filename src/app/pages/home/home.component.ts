import { Component, inject, resource, computed, effect } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Meta, Title } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    FooterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle('Home');
    this.meta.updateTag({
      name: 'description',
      content:
        "Home Page",
    });
    this.meta.updateTag({ property: 'og:title', content: 'Home' });
    this.meta.updateTag({
      property: 'og:description',
      content:
        "Home Page",
    });
  }
  
}
