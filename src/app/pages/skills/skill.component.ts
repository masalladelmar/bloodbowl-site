import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillsService } from 'src/app/services/skills.service';
import { Skill } from 'src/app/models/skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  type: string;
  skills: Skill[];
  title: string;

  constructor(
    private route: ActivatedRoute,
    private skillsService: SkillsService
  ) {
    this.route.paramMap.subscribe(
      data => {
        this.type = data.get('type');

        this.skillsService.getTypes().subscribe(
          response => {
            this.title = response.find(el => el.link === this.type).name;
          }
        );

        this.skillsService.getSkills(this.type).subscribe(
          response => {
            this.skills = response;
          },
          error => console.log(error)
        );
      }
    );
  }

  ngOnInit() {
  }

}
