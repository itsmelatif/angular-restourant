import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientsChange = new Subject<Ingredient[]>();
  startedEditIngredient =  new Subject<number>();

  private ingridients: Ingredient[] = [
    new Ingredient('Apple', 10),
    new Ingredient('Orange', 33),
    new Ingredient('Sugar', 5),
    new Ingredient('Chocolate', 2),
  ]

  constructor() { }

  getIngredients(){
    return this.ingridients.slice();
  }

  getIngredient(index: number){
    return this.ingridients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingridients.push(ingredient);
    this.ingredientsChange.next(this.ingridients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingridients.push(...ingredients);
    this.ingredientsChange.next(this.ingridients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingridients[index] = newIngredient;
    this.ingredientsChange.next(this.ingridients.slice());
  }

  deleteIngredient(index: number){
    const newIngredient = this.ingridients.splice(index, 1);
    this.ingredientsChange.next(newIngredient);

  }
}

