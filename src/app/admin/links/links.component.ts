import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  links;

  constructor(
    private commonsService: CommonsService,
    private linksService: LinksService
  ) { }

  ngOnInit() {
    this.commonsService.setLoading(true);
    this.linksService.getLinks().subscribe(
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

}
