import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-shopping-content',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './shopping-content.component.html',
  styleUrl: './shopping-content.component.css'
})
export class ShoppingContentComponent {

}
