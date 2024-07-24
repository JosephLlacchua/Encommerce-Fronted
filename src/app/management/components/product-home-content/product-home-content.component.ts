import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-home-content',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './product-home-content.component.html',
  styleUrl: './product-home-content.component.css'
})
export class ProductHomeContentComponent {

}
