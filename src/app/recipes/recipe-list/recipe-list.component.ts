import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes:  Recipe[] = [];
  subscription!: Subscription;
  constructor(
    private _RecipesService: RecipesService,
    private _router: Router,
    private _activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.subscription = this._RecipesService.recipesChanged.subscribe((response: Recipe[]) => {
      this.recipes = response;
    });

    this.recipes = this._RecipesService.getRecipes();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onRecipeItem(item: Event){
    console.log(item);
  }

  onNewRecipe(){
    this._router.navigate(['new'], {relativeTo: this._activeRoute});
  }

}
