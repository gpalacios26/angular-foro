import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {

  public title = 'Foro en Angular';
  public token;
  public identity;
  public search;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  goSearch() {
    if (this.search && this.search != undefined) {
      this._router.navigate(['/buscar', this.search]);
    }
  }

  logout() {
    // Borrar la sesión del storage
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();

    this.identity = null;
    this.token = null;

    // Redireccionar a la pantalla principal
    this._router.navigate(['inicio']);
  }

}
