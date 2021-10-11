import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../auth/user.model';
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private urlFirebase = 'https://angular-restourant-project-default-rtdb.asia-southeast1.firebasedatabase.app/'

  constructor(
    private _http: HttpClient,
    private _recipesService: RecipesService,
    private _authService: AuthService
  ) { }

  storeRecipes(){
    const recipes = this._recipesService.getRecipes();
    this._http.put(this.urlFirebase+'recipes.json', {
      recipes
    }).subscribe(response => {
      console.log(response);
    })
  }

  fetchData(){
      return this._http.get(this.urlFirebase+'recipes.json').pipe(
        map((response: any) => {
        return response.recipes.map((item: Recipe) => {
          return {...item, ingredients: item.ingredients ? item.ingredients : []}
        });
      }),
      tap((recipes: Recipe[]) => {
        this._recipesService.setRecipes(recipes);
      })
    );
  }
}
