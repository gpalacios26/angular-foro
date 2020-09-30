import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.page_title = 'Identificate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    // Obtener los datos del usuario
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          this.status = 'success';
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          // Obtener el token
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.token = response.token;
              localStorage.setItem('token', this.token);
              // Limpiar el formulario
              form.reset();
              // Redireccionar a la pantalla principal
              this._router.navigate(['inicio']);
            },
            error => {
              console.log(error);
              this.status = 'error';
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

}
