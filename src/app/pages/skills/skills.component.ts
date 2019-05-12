import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/services/skills.service';
import { SkillType } from 'src/app/models/skill.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  types: SkillType[];

  constructor(
    private skillsService: SkillsService
  ) {}

  ngOnInit() {
    this.skillsService.getTypes().subscribe(
      response => {
        this.types = response;
      }
    );
  }

}
