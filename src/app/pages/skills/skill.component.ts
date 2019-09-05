import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillsService } from 'src/app/services/skills.service';
import { Skill, SkillTypes } from 'src/app/models/skill.model';
import { CommonsService } from 'src/app/services/commons.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent implements OnInit {
  type: string;
  skills: Skill[];

  constructor(
    private route: ActivatedRoute,
    private skillsService: SkillsService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setLoading(true);
    this.route.paramMap.subscribe(data => {
      this.type = data.get('type');

      forkJoin(this.skillsService.getSkills(this.type)).subscribe(
        response => {
          this.commonsService.setTitle(SkillTypes.find(el => el.link === this.type).name);
          this.skills = response[0];
          this.commonsService.setLoading(false);
        },
        error => {
          this.commonsService.handleError(
            error.status === 500
              ? 'Se ha producido un error al recuperar las habilidades'
              : error.message
          );
          this.commonsService.setLoading(false);
        }
      );
    });
  }

  ngOnInit() {}
}
