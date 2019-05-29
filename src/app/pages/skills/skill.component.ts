import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillsService } from 'src/app/services/skills.service';
import { Skill } from 'src/app/models/skill.model';
import { CommonsService } from 'src/app/services/commons.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  type: string;
  skills: Skill[];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private skillsService: SkillsService,
    private commonsService: CommonsService
  ) {
    this.loading = true;
    this.route.paramMap.subscribe(
      data => {
        this.type = data.get('type');

        forkJoin(
          this.skillsService.getTypes(),
          this.skillsService.getSkills(this.type)
        )
        .subscribe(
          response => {
            this.commonsService.setTitle(response[0].find(el => el.link === this.type).name);
            this.skills = response[1];
            this.loading = false;
          },
          error => {
            this.commonsService.handleError(error.status === 500
              ? 'Se ha producido un error al recuperar las habilidades'
              : error.message);
            this.loading = false;
          }
        );
      }
    );
  }

  ngOnInit() {
  }

}
