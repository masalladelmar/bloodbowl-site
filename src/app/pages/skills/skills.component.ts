import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/services/skills.service';
import { SkillType } from 'src/app/models/skill.model';
import { CommonsService } from 'src/app/services/commons.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  types: SkillType[];

  constructor(
    private skillsService: SkillsService,
    private commonsService: CommonsService
  ) {
    this.commonsService.setTitle('Tipos de habilidades');
  }

  ngOnInit() {
    this.skillsService.getTypes().subscribe(
      response => {
        this.types = response;
      }
    );
  }

}
