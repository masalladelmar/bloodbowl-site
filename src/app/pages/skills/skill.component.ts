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

  constructor(
    private route: ActivatedRoute,
    private skillsService: SkillsService
  ) {
    this.route.paramMap.subscribe(
      response => {
        this.type = response.get('type');
        console.log(this.type);
        this.skillsService.getSkills(this.type).subscribe(
          response2 => {
            this.skills = response2;
            console.log(this.skills);
          },
          error => console.log(error)
        );
      }
    );
  }

  ngOnInit() {
  }

}
