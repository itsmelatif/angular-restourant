import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Ingredient[] = []
  subscription!: Subscription;
  constructor(
    private _ShoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
    this.ingridients = this._ShoppingService.getIngredients();
    this.subscription = this._ShoppingService.ingredientsChange.subscribe((response: Ingredient[]) => {
      this.ingridients = response;
    })
  }

  onEditIngredien(index: number){
    this._ShoppingService.startedEditIngredient.next(index);
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }


}
