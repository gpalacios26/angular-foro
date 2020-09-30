import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../models/topic';
import { Comment } from '../../models/comment';
import { UserService } from '../../services/user.service';
import { TopicService } from '../../services/topic.service';
import { CommentService } from '../../services/comment.service';
import { GLOBAL } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [UserService, TopicService, CommentService]
})
export class TopicDetailComponent implements OnInit {

  public topic: Topic;
  public comment: Comment;
  public status: string;
  public url: string;
  public token;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _topicService: TopicService,
    private _commentService: CommentService
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
    this.comment = new Comment('', '', '', null);
  }

  ngOnInit() {
    // Cargamos el topic
    this.getTopic();
    // Habilitamos comentarios al usuario identificado
    if (this.identity) { this.comment.user = this.identity._id; }
  }

  getTopic() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._topicService.getTopic(id).subscribe(
        response => {
          this.topic = new Topic('', '', '', '', '', '', null, null);
          if (response.status == 'success') {
            this.topic = response.topic;
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      );
    });
  }

  onSubmit(form) {
    this.status = null;
    this._commentService.addComment(this.token, this.topic._id, this.comment).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          // Vaciar el formulario
          this.comment = new Comment('', '', '', this.identity._id);
          form.reset();
          // Cargamos el topic
          this.getTopic();
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
        this._commentService.deleteComment(this.token, this.topic._id, id).subscribe(
          response => {
            if (response.status == 'success') {
              // Muestro alerta
              Swal.fire({
                title: 'Comentario eliminado!!!',
                text: 'El comentario se ha eliminado correctamente',
                icon: 'success'
              });

              // Cargamos el topic
              this.getTopic();
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }

}
