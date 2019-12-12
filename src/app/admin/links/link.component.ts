import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationLink } from 'src/app/models/link.model';
import { LinksService } from 'src/app/services/links.service';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  linkform: FormGroup;
  data: NavigationLink;
  title: string;

  resolve = false;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private linksService: LinksService,
    private commonsService: CommonsService
  ) {
    this.linkform = this.fb.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        url: ['', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      }
    );
  }

  ngOnInit() {
    if (this.data) {
      this.title = 'Editar';
      this.linkform.controls.name.setValue(this.data.name);
      this.linkform.controls.description.setValue(this.data.description);
      this.linkform.controls.url.setValue(this.data.url);
    } else {
      this.title = 'Nueva';
    }
  }

  get name() {
    return this.linkform.get('name');
  }
  get description() {
    return this.linkform.get('description');
  }
  get url() {
    return this.linkform.get('url');
  }

  public close() {
    this.bsModalRef.hide();
  }

  public onSubmit() {
    if (this.linkform.valid) {
      this.commonsService.setLoading(true);
      const link = {
        name: this.linkform.controls.name.value,
        description: this.linkform.controls.description.value,
        url: this.linkform.controls.url.value
      };
      if (this.data) {
        this.linksService.update(this.data.id, link).subscribe(
          _ => {
            this.commonsService.handleSuccess('Enlace actualizado');
            this.commonsService.setLoading(false);
            this.bsModalRef.hide();
            this.resolve = true;
          },
          error => {
            this.commonsService.handleError(
              error.status === 500
                ? 'Se ha producido un error al actualizar el enlace'
                : error.message
            );
            this.commonsService.setLoading(false);
          }
        );
      } else {
        this.linksService.create(link).subscribe(
          _ => {
            this.commonsService.handleSuccess('Enlace creado');
            this.commonsService.setLoading(false);
            this.bsModalRef.hide();
            this.resolve = true;
          },
          error => {
            this.commonsService.handleError(
              error.status === 500
                ? 'Se ha producido un error al crear el enlace'
                : error.message
            );
            this.commonsService.setLoading(false);
          }
        );
      }
    } else {
      this.commonsService.markFormGroupTouched(this.linkform);
      console.log(this.linkform);
      if (this.linkform.controls['url'].invalid) {
        this.commonsService.handleError('La URL no es válida');
      }
      if (this.linkform.controls['name'].invalid) {
        this.commonsService.handleError('Debes rellenar el nombre');
      }
      if (this.linkform.controls['description'].invalid) {
        this.commonsService.handleError('Debes rellenar la descripción');
      }
    }
  }
}
