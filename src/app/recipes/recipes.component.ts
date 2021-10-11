import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  selectedRecipe!: Recipe;
  constructor(
    private _RecipeService: RecipesService
  ) { }

  ngOnInit(): void {
    this._RecipeService.selectedRecipe.subscribe((response : Recipe) => {
      this.selectedRecipe = response;
    })
  }

}
