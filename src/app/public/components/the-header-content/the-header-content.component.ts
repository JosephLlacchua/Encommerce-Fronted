import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-the-header-content',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './the-header-content.component.html',
  styleUrl: './the-header-content.component.css'
})
export class TheHeaderContentComponent {

}
