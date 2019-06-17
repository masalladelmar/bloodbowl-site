import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Race } from 'src/app/models/race.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsService } from 'src/app/services/commons.service';
import { RacesService } from 'src/app/services/races.service';
import { forkJoin } from 'rxjs';
import { PositionsService } from 'src/app/services/positions.service';
import { Position } from '../../models/position.model';
import { SkillsService } from 'src/app/services/skills.service';
import { ModalService } from 'src/app/services/modal.service';
import { PositionComponent } from '../positions/position.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { SkillType } from 'src/app/models/skill.model';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {
  race: Race;
  raceform: FormGroup;
  race_id: string;
  title: string;
  positions: Position[];
  types: SkillType[];

  constructor(
    private racesService: RacesService,
    private positionsService: PositionsService,
    private skillsService: SkillsService,
    private route: ActivatedRoute,
    private commonsService: CommonsService,
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.raceform = this.fb.group({
      name: ['', Validators.required],
      reroll_cost: ['', Validators.required],
      description: [''],
      coat_arms: ['', Validators.required],
      apothecary: ['']
    });
    this.commonsService.setLoading(true);
    this.race_id = this.route.snapshot.paramMap.get('race');
    if (this.race_id !== 'new') {
      this.title = 'Editar';
      forkJoin(
        this.skillsService.getTypes(),
        this.racesService.getRace(this.race_id),
        this.positionsService.getPositions(Number(this.race_id))
      )
      .subscribe(
        response => {
          this.types = response[0];
          this.race = response[1];
          this.raceform.get('name').setValue(this.race.name);
          this.raceform.get('reroll_cost').setValue(this.race.reroll_cost);
          this.raceform.get('description').setValue(this.race.description);
          this.raceform.get('coat_arms').setValue(this.race.coat_arms);
          this.raceform.get('apothecary').setValue(this.race.apothecary);

          this.positions = response[2];
        },
        error => {
          this.commonsService.handleError(error.status === 500
            ? 'Se ha producido un error al recuperar los datos de la raza'
            : error.message);
          this.commonsService.setLoading(false);
        }
      );
    } else {
      this.title = 'Nueva';
      this.positions = [];
    }
  }

  ngOnInit() {
  }

  getTypesSelected(types: string): string {
    let out = '';
    const divided = types.split(',');
    divided.forEach(sk => {
      const finded = this.types.find(el => el.link === sk);
      if (finded) {
        out += (out === '' ? '' : ', ') + finded.short;
      }
    });

    return out;
  }

  get name() {
    return this.raceform.get('name');
  }
  get reroll_cost() {
    return this.raceform.get('reroll_cost');
  }
  get description() {
    return this.raceform.get('description');
  }
  get coat_arms() {
    return this.raceform.get('coat_arms');
  }
  get apothecary() {
    return this.raceform.get('apothecary');
  }

  addPosition() {
    this.modalPosition(null);
  }

  editPosition(position: Position) {
    this.modalPosition(position);
  }

  private modalPosition(position: Position) {
    const inputs = {
      position: position,
      skilltypes: this.types
    };
    this.modalService.init(PositionComponent, inputs, {});
    const modalOutput$ = this.modalService.getOutput().subscribe(
      response => {
        if (response === true) {
          modalOutput$.unsubscribe();
          this.positionsService.getPositions(Number(this.race_id)).subscribe(
            data => {
              this.positions = data;
            },
            error => {
              this.commonsService.handleError(error.status === 500
                ? 'Se ha producido un error al recuperar las posiciones'
                : error.message);
              this.commonsService.setLoading(false);
            }
          );
        }
        if (response === false) {
          // TODO Fix unsubscribe of undefined
          modalOutput$.unsubscribe();
        }
      }
    );
  }

  deletePosition(position: Position) {
    const inputs = {
      bodyText: `¿Seguro que quieres eliminar la posición ${position.name}?`
    };
    const outputs = {};
    this.modalService.init(ConfirmationModalComponent, inputs, outputs);
    const modalOutput$ = this.modalService.getOutput().subscribe(
      response => {
        if (response === true) {
          this.positionsService.delete(position).subscribe(
            data => {
              this.commonsService.handleSuccess('Poisición eliminada');
              modalOutput$.unsubscribe();
            },
            error => {
              this.commonsService.handleError(error.status === 500
                ? 'Se ha producido un error al eliminar la posición'
                : error.message);
              this.commonsService.setLoading(false);
            }
          );
        }
        if (response === false) {
          modalOutput$.unsubscribe();
        }
      }
    );
  }

  positionUp() {
    // Mover hacia arriba la posición en la lista
  }

  positionDown() {
    // Mover hacia abajo la posición en la lista
  }
}
