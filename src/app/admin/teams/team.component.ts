import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';
import { PlayersService } from 'src/app/services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/models/team.model';
import { Player } from 'src/app/models/player.model';
import { forkJoin } from 'rxjs';
import { RacesService } from 'src/app/services/races.service';
import { CoachesService } from 'src/app/services/coaches.service';
import { Race } from 'src/app/models/race.model';
import { Coach } from 'src/app/models/coach.model';
import { PositionsService } from 'src/app/services/positions.service';
import { Position } from 'src/app/models/position.model';
import { PlayerComponent } from '../players/player.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  races: Race[];
  coaches: Coach[];
  positions: Position[];
  modalRef: BsModalRef;
  canBuyPlayers: boolean;

  constructor(
    private teamsService: TeamsService,
    private playersService: PlayersService,
    // private skillsService: SkillsService,
    private route: ActivatedRoute,
    private commonsService: CommonsService,
    // private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private racesService: RacesService,
    private coachesService: CoachesService,
    private positionsService: PositionsService,
    private modalService: BsModalService
  ) {
    this.teamform = this.fb.group({
      name: ['', Validators.required],
      fan_factor: ['', Validators.required],
      assistants: ['', Validators.required],
      cheerleaders: ['', Validators.required],
      apothecary: [''],
      rerolls: ['', Validators.required],
      treasury: ['', Validators.required],
      value: ['', Validators.required],
      coach_id: ['', Validators.required],
      race_id: ['', Validators.required]
    });
    this.commonsService.setLoading(true);
    this.team_id = this.route.snapshot.paramMap.get('team');
    this.canBuyPlayers = false;

    forkJoin(
      this.racesService.getRaces(),
      this.coachesService.getCoaches()
    )
    .subscribe(
      response => {
        this.races = response[0];
        this.coaches = response[1];
      },
      error => {
        this.commonsService.handleError(error.status === 500
          ? 'Se ha producido un error al recuperar las razas y los entrenadores'
          : error.message);
        this.commonsService.setLoading(false);
      }
    );

    if (this.team_id !== 'new') {
      this.title = 'Editar';
      forkJoin(
        // this.skillsService.getTypes(),
        this.teamsService.getTeamById(Number(this.team_id))
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
          this.teamform.get('coach_id').setValue(this.team.coach_id);
          this.teamform.get('race_id').setValue(this.team.race_id);

          this.positionsService.getPositions(this.team.race_id).subscribe(
            data => {
              this.positions = data;
              if (this.positions.find(el => el.price < this.team.treasury) && this.team.players.length < 16) {
                this.canBuyPlayers = true;
              }
            },
            error => {
              this.commonsService.handleError(error.status === 500
                ? 'Se ha producido un error al recuperar las posiciones disponibles de la raza'
                : error.message);
              this.commonsService.setLoading(false);
            }
          );
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
      this.teamform.get('fan_factor').setValue(0);
      this.teamform.get('assistants').setValue(0);
      this.teamform.get('cheerleaders').setValue(0);
      this.teamform.get('rerolls').setValue(0);
      this.teamform.get('treasury').setValue(1000000);
      this.teamform.get('treasury').disable();
    }
  }

  ngOnInit() {
  }

  get name() {
    return this.teamform.get('name');
  }
  get fan_factor() {
    return this.teamform.get('fan_factor');
  }
  get assistants() {
    return this.teamform.get('assistants');
  }
  get cheerleaders() {
    return this.teamform.get('cheerleaders');
  }
  get apothecary() {
    return this.teamform.get('apothecary');
  }
  get rerolls() {
    return this.teamform.get('rerolls');
  }
  get treasury() {
    return this.teamform.get('treasury');
  }
  get value() {
    return this.teamform.get('value');
  }
  get coach_id() {
    return this.teamform.get('coach_id');
  }
  get race_id() {
    return this.teamform.get('race_id');
  }

  getPosition(position_id: number): string {
    return this.positions ? this.positions.find(el => el.id === position_id).name : '';
  }

  addPlayer() {
    this.modalPlayer(null);
  }

  editPlayer(player: Player) {
    this.modalPlayer(player);
  }

  private modalPlayer(player: Player) {
    const initialState = {
      player: player,
      team: this.team,
      positions: this.positions
    };
    this.modalRef = this.modalService.show(PlayerComponent, {initialState});

    const modalSubs$ = this.modalService.onHide.subscribe((reason: string) => {
      this.playersService.getTeamPlayers(Number(this.team_id)).subscribe(
        data => {
          this.players = data;
        },
        error => {
          this.commonsService.handleError(error.status === 500
            ? 'Se ha producido un error al recuperar los jugadores'
            : error.message);
          this.commonsService.setLoading(false);
        }
      );
      modalSubs$.unsubscribe();
    });
  }

  /*private modalPlayer(player: Position) {
    const inputs = {
      player: player,
      team_id: this.team_id
    };
    this.modalService.init(PlayerComponent, inputs, {});
    const modalOutput$ = this.modalService.getOutput().subscribe(
      response => {
        if (response === true) {
          modalOutput$.unsubscribe();
          this.playersService.getTeamPlayers(Number(this.team_id)).subscribe(
            data => {
              this.players = data;
            },
            error => {
              this.commonsService.handleError(error.status === 500
                ? 'Se ha producido un error al recuperar los jugadores'
                : error.message);
              this.commonsService.setLoading(false);
            }
          );
        }
        if (response === false && modalOutput$) {
          // TODO Fix unsubscribe of undefined
          modalOutput$.unsubscribe();
        }
      }
    );
  }*/
}
