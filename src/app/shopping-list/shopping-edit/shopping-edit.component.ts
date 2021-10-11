import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') slForm !: NgForm;
  editStatus = false;
  itemIngredient !: Ingredient;
  itemIndexIngredit !: number;

  constructor(
    private _ShoppingService: ShoppingService
  ) { }

  ngOnInit(): void {
    this._ShoppingService.startedEditIngredient.subscribe((index: number) => {
      this.editStatus = true;
      this.itemIndexIngredit = index;
      this.itemIngredient = this._ShoppingService.getIngredient(index);

      this.slForm.setValue({
        name: this.itemIngredient.name,
        qty: this.itemIngredient.amount
      })
    });
  }

  onAddShopping(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.qty);

    if(this.editStatus){
      this._ShoppingService.updateIngredient(this.itemIndexIngredit, newIngredient);
      this.editStatus = false;
    }else{
      this._ShoppingService.addIngredient(newIngredient);
    }

    form.reset();
  }

  onClearForm(){
    this.slForm.reset();
    this.editStatus = false;
  }

  onDeleteItem(){
    this._ShoppingService.deleteIngredient(this.itemIndexIngredit);
    this.onClearForm();
  }


}
