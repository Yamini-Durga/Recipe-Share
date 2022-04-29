import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  ingredients = [1,2,3,4,5];
  constructor() { }

  ngOnInit(): void {
  }

}
