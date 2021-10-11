import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipesService } from "./recipes.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
  constructor(
    private _dataStorageService: DataStorageService,
    private _recipesService: RecipesService
  ){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this._recipesService.getRecipes();

    if(recipes.length === 0){
      return this._dataStorageService.fetchData();
    }else{
      return recipes;
    }

  }
}
