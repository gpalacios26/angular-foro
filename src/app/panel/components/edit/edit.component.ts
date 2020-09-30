import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../../models/topic';
import { UserService } from '../../../services/user.service';
import { TopicService } from '../../../services/topic.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService, TopicService]
})
export class EditComponent implements OnInit {

  public page_title: string;
  public topic: Topic;
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
    this.page_title = "Editar Tema";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    // Cargamos el topic
    this.getTopic();
  }

  onSubmit(form) {
    var topicId = this.topic._id;
    this._topicService.updateTopic(this.token, topicId, this.topic).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.topic = response.topic;
          // Redireccionar a la pantalla listado
          this._router.navigate(['/panel/listado']);
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

  getTopic() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._topicService.getTopic(id).subscribe(
        response => {
          this.topic = new Topic('', '', '', '', '', '', this.identity._id, null);
          if (response.status == 'success') {
            this.topic = response.topic;
          } else {
            this._router.navigate(['/panel/listado']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/panel/listado']);
        }
      );
    });
  }

}
