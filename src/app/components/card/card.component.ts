import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Products } from '../../models/product';
import { products } from '../../helpers/constant';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    DividerModule,
    NgFor,
    CommonModule,
    RatingModule,
    FormsModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  products: Products[] = products;
  counter: number = 0;
  @Input() isCartShowing: boolean = false;

  constructor(private cartService: CartService) {}

  addTheProduct(product: Products) {
    this.cartService.addTheProduct(product);
  }

  removeTheProduct(productId: number) {
    this.cartService.removeTheProduct(productId);
  }
}
