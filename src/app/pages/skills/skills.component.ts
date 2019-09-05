import { Component, OnInit } from '@angular/core';
import { CommonsService } from 'src/app/services/commons.service';
import { SkillTypes } from 'src/app/models/skill.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  types = SkillTypes;

  constructor(private commonsService: CommonsService) {
    this.commonsService.setTitle('Tipos de habilidades');
  }

  ngOnInit() {}
}
