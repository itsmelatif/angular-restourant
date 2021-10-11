import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  show = false;
  id!: number;
  recipeItem!: Recipe;

  constructor(
    private _RecipesService: RecipesService,
    private _activedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._activedRoute.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.getRecipe(this.id);
      })
  }

  getRecipe(index: number){
    this.recipeItem = this._RecipesService.getRecipe(index);
  }

  onAddedShoppingList(){

  }

  onEditRecipe(){
    this._router.navigate(['edit'], {relativeTo: this._activedRoute});
  }

  onDeleteRecipe(){
    this._RecipesService.deleteRecipe(this.id);
    this._router.navigate(['../../'], {relativeTo: this._activedRoute});
  }

}
