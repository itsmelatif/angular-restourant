import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipeItem!: Recipe;
  @Input() index!:number;
  constructor(
    private _RecipeService: RecipesService
  ) { }

  ngOnInit(): void {
  }

  onSelectedRecipe(){
    this._RecipeService.selectedRecipe.emit(this.recipeItem);
  }
}
