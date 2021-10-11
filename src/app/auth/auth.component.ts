import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;
  private closeSubs !: Subscription;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.closeSubs){
      this.closeSubs.unsubscribe();
    }
  }
  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(form.invalid){
      return;
    }

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    if(!this.isLoginMode){
      this.onSignUp(email, password);
    }else{
      this.onLogin(email, password);
    }

    form.reset();
  }

  onLogin(email: string, password: string){
    this._authService.login(email, password).subscribe(response => {
      this.isLoading = false;
      this._router.navigate(['/recipes']);
    }, errorMessage => {
      this.isLoading = false;
      this.showErrorAlert(errorMessage);
    })
  }

  onSignUp(email: string, password: string){
    this._authService.signUp(email, password).subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, errorMessage => {
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message: string){

    const alertComponent = this._componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    this.alertHost.viewContainerRef.clear();
    const componentRef = this.alertHost.viewContainerRef.createComponent(alertComponent);

    componentRef.instance.message = message;
    this.closeSubs = componentRef.instance.close.subscribe(() => {
      this.closeSubs.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    });

  }


}
