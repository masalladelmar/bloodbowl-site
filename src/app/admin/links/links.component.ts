import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { LinksService } from 'src/app/services/links.service';
import { NavigationLink } from 'src/app/models/link.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LinkComponent } from './link.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  links: NavigationLink[];
  modalRef: BsModalRef;

  constructor(
    private commonsService: CommonsService,
    private linksService: LinksService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.commonsService.setLoading(true);
    this.linksService.get().subscribe(
      data => {
        this.links = data;
        this.commonsService.setLoading(false);
      },
      error => {
        this.commonsService.handleError(
          error.status === 500
            ? 'Se ha producido un error al recuperar los enlaces'
            : error.message
        );
        this.commonsService.setLoading(false);
      }
    );
  }

  private updateLinks() {
    this.linksService.get().subscribe(
      data => {
        this.links = data;
      },
      error => {
        this.commonsService.handleError(
          error.status === 500
            ? 'Se ha producido un error al recuperar los enlaces'
            : error.message
        );
      }
    );
  }

  private modalLink(data: NavigationLink) {
    const initialState = {
      data: data
    };
    this.modalRef = this.modalService.show(LinkComponent, {
      initialState
    });
    const modalSubs$ = this.modalService.onHide.subscribe((reason: string) => {
      if (this.modalRef.content.resolve === true) {
        this.linksService.get().subscribe(
          links => {
            this.links = links;
          },
          error => {
            this.commonsService.handleError(
              error.status === 500
                ? 'Se ha producido un error al recuperar los enlaces'
                : error.message
            );
            this.commonsService.setLoading(false);
          }
        );
      }
      modalSubs$.unsubscribe();
    });
  }

  addLink() {
    this.modalLink(null);
  }

  editLink(data: NavigationLink) {
    this.modalLink(data);
  }

  deleteLink(data: NavigationLink) {
    const initialState = {
      bodyText: `¿Seguro que quieres eliminar el enlace '${data.name}'?`,
    };
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState,
      class: 'modal-sm',
    });
    const modalSubs$ = this.modalService.onHide.subscribe((reason: string) => {
      if (this.modalRef.content.resolve === true) {
        this.linksService.delete(data).subscribe(
          response => {
            this.commonsService.handleSuccess('Enlace eliminado');
            this.updateLinks();
          },
          error => {
            this.commonsService.handleError(
              error.status === 500
                ? 'Se ha producido un error al eliminar el enlace'
                : error.message
            );
            this.commonsService.setLoading(false);
          }
        );
      }
      modalSubs$.unsubscribe();
    });
  }

  publishLink(data: NavigationLink) {
    data.published = !data.published;
    this.commonsService.setLoading(true);
    this.linksService.update(data.id, data).subscribe(
      _ => {
        this.commonsService.handleSuccess('Enlace actualizado');
        this.commonsService.setLoading(false);
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
  }
}
