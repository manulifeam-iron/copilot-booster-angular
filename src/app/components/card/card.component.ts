import { Component, computed, inject, input } from '@angular/core';
import { Doctor, Patient } from '../../../type';
import {
  faEye,
  faHeart,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  imports: [FontAwesomeModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  private readonly router = inject(Router);

  faHeart = faHeart;
  faEye = faEye;
  faCartShopping = faCartShopping;

  doctor = input<Doctor>();
  patient = input<Patient>();
  
  onClickNavigate() {
    this.router.navigate(['/doctors', this.doctor()?.id]);
  }
}
