import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  show = false;

  isAuth = false;
  private subscription : Subscription[] = [];

  constructor(
    private _dataStorage: DataStorageService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    const subsUser = this._authService.user.subscribe(user => {
      this.isAuth = !user ? false : true;
    });

    this.subscription.push(subsUser);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subs => subs.unsubscribe());
  }

  onSaveData(){
    this._dataStorage.storeRecipes();
  }

  onFetchData(){
    const subsFetch = this._dataStorage.fetchData().subscribe();
    this.subscription.push(subsFetch)
  }

  onLogout(){
    this._authService.logout();
  }


}
