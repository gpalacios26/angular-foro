import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public url: string;
  public token;
  public identity;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url: GLOBAL.url + "upload-avatar",
      method: "POST",
      headers: {
        "Authorization": this._userService.getToken()
      },
      responseType: 'json',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    replaceTexts: {
      attachPinBtn: 'Sube la imagen del usuario',
      afterUploadMsg_success: 'Imagen cargada correctamente',
      afterUploadMsg_error: 'Error al cargar la imagen',
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.page_title = "Ajustes";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    // Rellenar objeto usuario identificado
    let id = this.identity._id;
    this.getUser(id);
  }

  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.user = response.user;
          localStorage.setItem('identity', JSON.stringify(this.user));
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

  imageUpload(data) {
    if (data) {
      let image_data = data.body;
      if (image_data.status == 'success') {
        let user_data = image_data.user;
        this.user.image = user_data.image;
      }
    }
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      response => {
        this.user = new User('', '', '', '', '', '', 'ROLE_USER');
        if (response.status == 'success') {
          this.user = response.user;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
