import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';
import { GLOBAL } from '../../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService, TopicService]
})
export class ListComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public status: string;
  public url: string;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService
  ) {
    this.page_title = "Mis Temas";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    // Cargamos los topics del usuario
    this.getTopics();
  }

  getTopics() {
    var userId = this.identity._id;
    this._topicService.getTopicsByUser(userId).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.topics = response.topics;
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  delete(id) {
    // Muestro Confirmación
    Swal.fire({
      title: 'Alerta',
      text: 'Deseas eliminar el registro seleccionado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ACEPTAR',
      cancelButtonText: 'CANCELAR'
    }).then((result) => {
      if (result.value) {
        this._topicService.deleteTopic(this.token, id).subscribe(
          response => {
            if (response.status == 'success') {
              this.status = response.status;

              // Muestro alerta
              Swal.fire({
                title: 'Tema eliminado!!!',
                text: 'El tema se ha eliminado correctamente',
                icon: 'success'
              });

              // Cargamos los topics del usuario
              this.getTopics();
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
    });
  }

}
