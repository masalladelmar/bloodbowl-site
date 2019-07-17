import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { PlayersService } from 'src/app/services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/models/team.model';
import { Player } from 'src/app/models/player.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: Team;
  teamform: FormGroup;
  team_id: string;
  title: string;
  players: Player[];
  // types: SkillType[];

  constructor(
    private teamsService: TeamsService,
    private playersService: PlayersService,
    // private skillsService: SkillsService,
    private route: ActivatedRoute,
    private commonsService: CommonsService,
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.teamform = this.fb.group({
      name: ['', Validators.required],
      reroll_cost: ['', Validators.required],
      coach_id: ['', Validators.required],
      coat_arms: ['', Validators.required],
      apothecary: ['']
    });
    this.commonsService.setLoading(true);
    this.team_id = this.route.snapshot.paramMap.get('team');
    if (this.team_id !== 'new') {
      this.title = 'Editar';
      forkJoin(
        // this.skillsService.getTypes(),
        this.teamsService.getTeamById(Number(this.team_id)),
        this.playersService.getTeamPlayers(Number(this.team_id))
      )
      .subscribe(
        response => {
          // this.types = response[0];
          this.team = response[0];
          this.teamform.get('name').setValue(this.team.name);
          this.teamform.get('fan_factor').setValue(this.team.fan_factor);
          this.teamform.get('assistants').setValue(this.team.assistants);
          this.teamform.get('cheerleaders').setValue(this.team.cheerleaders);
          this.teamform.get('apothecary').setValue(this.team.apothecary);
          this.teamform.get('rerolls').setValue(this.team.rerolls);
          this.teamform.get('treasury').setValue(this.team.treasury);
          this.teamform.get('value').setValue(this.team.value);

          this.players = response[1];
        },
        error => {
          this.commonsService.handleError(error.status === 500
            ? 'Se ha producido un error al recuperar los datos de la raza'
            : error.message);
          this.commonsService.setLoading(false);
        }
      );
    } else {
      this.title = 'Nuevo';
      this.players = [];
    }
  }

  ngOnInit() {
  }

}
