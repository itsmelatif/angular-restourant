(self.webpackChunkrestourant=self.webpackChunkrestourant||[]).push([[859],{5859:(t,e,n)=>{"use strict";n.r(e),n.d(e,{ShoppingListModule:()=>m});var i=n(4988),s=n(3435),r=n(5349),o=n(3606),c=n(5029),u=n(6967),d=n(6274);const p=["f"];function g(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"button",14),o.NdJ("click",function(){return o.CHM(t),o.oxw().onDeleteItem()}),o._uU(1,"Delete"),o.qZA()}}let l=(()=>{class t{constructor(t){this._ShoppingService=t,this.editStatus=!1}ngOnInit(){this._ShoppingService.startedEditIngredient.subscribe(t=>{this.editStatus=!0,this.itemIndexIngredit=t,this.itemIngredient=this._ShoppingService.getIngredient(t),this.slForm.setValue({name:this.itemIngredient.name,qty:this.itemIngredient.amount})})}onAddShopping(t){const e=t.value,n=new u.o(e.name,e.qty);this.editStatus?(this._ShoppingService.updateIngredient(this.itemIndexIngredit,n),this.editStatus=!1):this._ShoppingService.addIngredient(n),t.reset()}onClearForm(){this.slForm.reset(),this.editStatus=!1}onDeleteItem(){this._ShoppingService.deleteIngredient(this.itemIndexIngredit),this.onClearForm()}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(c.s))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-shopping-edit"]],viewQuery:function(t,e){if(1&t&&o.Gf(p,5),2&t){let t;o.iGM(t=o.CRH())&&(e.slForm=t.first)}},decls:21,vars:2,consts:[[1,"row","mb-5"],[1,"col-5"],[3,"ngSubmit"],["f","ngForm"],[1,"row"],[1,"col-8"],["for",""],["type","text","id","name","name","name","ngModel","",1,"form-control"],[1,"col-4"],["type","number","id","qty","name","qty","ngModel","",1,"form-control"],[1,"col-12","pt-4"],["type","submit",1,"btn","btn-success"],[1,"btn","btn-secondary",3,"click"],["class","btn btn-danger",3,"click",4,"ngIf"],[1,"btn","btn-danger",3,"click"]],template:function(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"div",0),o.TgZ(1,"div",1),o.TgZ(2,"form",2,3),o.NdJ("ngSubmit",function(){o.CHM(t);const n=o.MAs(3);return e.onAddShopping(n)}),o.TgZ(4,"div",4),o.TgZ(5,"div",5),o.TgZ(6,"label",6),o._uU(7,"Name"),o.qZA(),o._UZ(8,"input",7),o.qZA(),o.TgZ(9,"div",8),o.TgZ(10,"label",6),o._uU(11,"QTY"),o.qZA(),o._UZ(12,"input",9),o.qZA(),o.TgZ(13,"div",10),o.TgZ(14,"button",11),o._uU(15),o.qZA(),o._uU(16,"\xa0\xa0\xa0 "),o.TgZ(17,"button",12),o.NdJ("click",function(){return e.onClearForm()}),o._uU(18,"Clear"),o.qZA(),o._uU(19," \xa0\xa0\xa0 "),o.YNc(20,g,2,0,"button",13),o.qZA(),o.qZA(),o.qZA(),o.qZA(),o.qZA()}2&t&&(o.xp6(15),o.Oqu(e.editStatus?"Edit":"Add"),o.xp6(5),o.Q6J("ngIf",e.editStatus))},directives:[i._Y,i.JL,i.F,i.Fj,i.JJ,i.On,i.wV,d.O5],styles:[""]}),t})();function a(t,e){if(1&t){const t=o.EpF();o.TgZ(0,"li",2),o.NdJ("click",function(){const e=o.CHM(t).index;return o.oxw().onEditIngredien(e)}),o._uU(1),o.qZA()}if(2&t){const t=e.$implicit;o.xp6(1),o.AsE(" ",t.name," (",t.amount,") ")}}let h=(()=>{class t{constructor(t){this._ShoppingService=t,this.ingridients=[]}ngOnInit(){this.ingridients=this._ShoppingService.getIngredients(),this.subscription=this._ShoppingService.ingredientsChange.subscribe(t=>{this.ingridients=t})}onEditIngredien(t){this._ShoppingService.startedEditIngredient.next(t)}ngOnDestroy(){this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(o.Y36(c.s))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-shopping-list"]],decls:3,vars:1,consts:[[1,"list-group"],["class","list-group-item",3,"click",4,"ngFor","ngForOf"],[1,"list-group-item",3,"click"]],template:function(t,e){1&t&&(o._UZ(0,"app-shopping-edit"),o.TgZ(1,"ul",0),o.YNc(2,a,2,2,"li",1),o.qZA()),2&t&&(o.xp6(2),o.Q6J("ngForOf",e.ingridients))},directives:[l,d.sg],styles:["li[_ngcontent-%COMP%]:hover{cursor:pointer}"]}),t})(),m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[i.u5,s.Bz.forChild([{path:"",component:h}]),r.m]]}),t})()}}]);